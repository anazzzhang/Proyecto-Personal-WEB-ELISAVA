"""Genera data/echoes-data.js a partir de las exportaciones personales.

Uso (desde la raíz del repositorio):
    python3 herramientas/procesar_datos.py \
        --spotify "RUTA/Spotify Extended Streaming History" \
        --spotify-log "RUTA/Spotify Technical Log Information" \
        --pinterest "RUTA/PINTEREST" \
        --instagram "RUTA/instagram-anazzzhang-..."

Las exportaciones en bruto NO se suben al repositorio (ver .gitignore).
El script solo escribe datos agregados: horas, artistas, nombres de tableros,
recuentos y etiquetas. No guarda IPs, mensajes, usuarios de terceros,
ubicaciones ni categorías publicitarias sobre la vida privada.
"""
import argparse, collections, datetime, glob, html, json, os, re
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Europe/Madrid")


def local(ts_iso):
    return datetime.datetime.fromisoformat(ts_iso.replace("Z", "+00:00")).astimezone(TZ)


def fix(s):
    """Instagram exporta UTF-8 mal codificado como latin-1."""
    try:
        return s.encode("latin1").decode("utf8")
    except Exception:
        return s


def hours(ms):
    return round(ms / 3.6e6, 1)


# ---------------------------------------------------------------- Spotify
def spotify(path, log_path):
    rows = []
    for f in glob.glob(os.path.join(path, "Streaming_History_Audio_*.json")):
        rows += json.load(open(f, encoding="utf8"))
    rows = [r for r in rows if r.get("master_metadata_track_name")]
    rows.sort(key=lambda r: r["ts"])
    for r in rows:
        r["_t"] = local(r["ts"])
        r["_a"] = r["master_metadata_album_artist_name"]
        r["_k"] = (r["master_metadata_track_name"], r["_a"])

    years = []
    by_year = collections.defaultdict(list)
    for r in rows:
        by_year[r["_t"].year].append(r)
    latest = max(by_year)
    now_art = collections.Counter()
    for r in by_year[latest]:
        now_art[r["_a"]] += r["ms_played"]
    for y, rs in sorted(by_year.items()):
        art = collections.Counter(); trk = collections.Counter()
        for r in rs:
            art[r["_a"]] += r["ms_played"]; trk[r["_k"]] += r["ms_played"]
        night = sum(1 for r in rs if r["_t"].hour < 5)
        years.append({
            "year": y,
            "hours": round(sum(r["ms_played"] for r in rs) / 3.6e6),
            "plays": len(rs),
            "artists": len(art),
            "topArtists": [{"name": a, "hours": hours(v), "nowHours": hours(now_art.get(a, 0))} for a, v in art.most_common(5)],
            "topTrack": {"name": trk.most_common(1)[0][0][0], "artist": trk.most_common(1)[0][0][1]},
            "nightShare": round(night / len(rs), 3),
            "skipShare": round(sum(1 for r in rs if r.get("skipped")) / len(rs), 3),
        })

    total = collections.Counter(); first = {}; last = {}
    for r in rows:
        total[r["_a"]] += r["ms_played"]; first.setdefault(r["_a"], r["ts"][:10]); last[r["_a"]] = r["ts"][:10]

    # Canciones muy escuchadas que dejaron de sonar antes de mediados de 2024.
    tr = {}
    for r in rows:
        v = tr.setdefault(r["_k"], [0, r["ts"][:10], r["ts"][:10]])
        v[0] += r["ms_played"]; v[2] = r["ts"][:10]
    forgotten = sorted(
        ([v[0], k, v[1], v[2]] for k, v in tr.items() if v[2] < "2024-06-01"), reverse=True
    )[:12]

    hour_curve = collections.Counter(r["_t"].hour for r in rows)

    # Río de artistas: horas por mes de los 8 artistas más escuchados + "otros".
    top8 = [a for a, _ in total.most_common(8)]
    months = sorted({r["_t"].strftime("%Y-%m") for r in rows})
    river = {a: collections.Counter() for a in top8 + ["Otros"]}
    for r in rows:
        river[r["_a"] if r["_a"] in top8 else "Otros"][r["_t"].strftime("%Y-%m")] += r["ms_played"]
    # Matriz año x hora (porcentaje de reproducciones de cada año en cada hora).
    hm = {}
    for y, rs in by_year.items():
        c = collections.Counter(r["_t"].hour for r in rs)
        hm[y] = [round(c.get(h, 0) / len(rs), 4) for h in range(24)]

    daylists = []
    daylist_tags = []
    f = os.path.join(log_path, "DaylistGenerated.json") if log_path else None
    if f and os.path.exists(f):
        d = json.load(open(f, encoding="utf8"))
        seen = []
        for x in sorted(d, key=lambda x: x["context_time"]):
            t = x["message_playlist_title"]
            if t not in seen:
                seen.append(t)
        daylists = seen
        desc = collections.Counter()
        for x in d:
            for m in re.findall(r">([^<]+)</a>", x["message_playlist_description"]):
                desc[m.strip()] += 1
        daylist_tags = [{"tag": t, "n": n} for t, n in desc.most_common(36)]
        dl_range = [
            datetime.datetime.fromtimestamp(min(x["context_time"] for x in d) / 1000, TZ).date().isoformat(),
            datetime.datetime.fromtimestamp(max(x["context_time"] for x in d) / 1000, TZ).date().isoformat(),
        ]
    return {
        "range": [rows[0]["ts"][:10], rows[-1]["ts"][:10]],
        "totalHours": round(sum(r["ms_played"] for r in rows) / 3.6e6),
        "totalPlays": len(rows),
        "firstTrack": {"name": rows[0]["master_metadata_track_name"], "artist": rows[0]["_a"], "date": rows[0]["ts"][:10]},
        "years": years,
        "allTime": [{"name": a, "hours": hours(v), "first": first[a], "last": last[a]} for a, v in total.most_common(10)],
        "forgotten": [{"name": k[0], "artist": k[1], "hours": hours(ms), "first": a, "last": b} for ms, k, a, b in forgotten],
        "echoHours": hours(sum(r["ms_played"] for r in rows if r["_a"] in ("BTS", "Jung Kook", "Jimin", "JIN", "V", "SUGA", "Agust D", "RM", "j-hope"))),
        "hourCurve": [hour_curve.get(h, 0) for h in range(24)],
        "months": months,
        "river": [{"name": a, "hours": [hours(river[a].get(m, 0)) for m in months]} for a in top8 + ["Otros"]],
        "hourMatrix": [{"year": y, "share": hm[y]} for y in sorted(hm)],
        "daylists": daylists,
        "daylistRange": dl_range if daylists else None,
        "daylistTags": daylist_tags if daylists else [],
    }


# ---------------------------------------------------------------- Pinterest
def sar_lines(path):
    t = open(path, encoding="utf8").read().split("Table of Contents", 1)[-1]
    t = html.unescape(re.sub(r"<[^>]+>", "\n", t))
    return [l.strip() for l in t.split("\n") if l.strip()]


def pinterest(path):
    pins = []
    for f in sorted(glob.glob(os.path.join(path, "pins", "0*.html"))):
        cur = None
        for l in sar_lines(f):
            if l.startswith("https://www.pinterest.com/pin/"):
                if cur: pins.append(cur)
                cur = {}
                continue
            m = re.match(r"(Board Name|Created at): ?(.*)", l)
            if m and cur is not None:
                cur[m.group(1)] = m.group(2)
        if cur: pins.append(cur)
    pins = [p for p in pins if p.get("Created at", "")[:4].isdigit()]
    per_year = collections.Counter(int(p["Created at"][:4]) for p in pins)
    boards = collections.defaultdict(list)
    for p in pins:
        boards[p.get("Board Name") or "—"].append(p["Created at"][:10].replace("/", "-"))
    board_list = []
    for name, dates in boards.items():
        if name in ("None", "—", "Collage Item Pins"):
            continue
        dates.sort()
        board_list.append({
            "name": name, "pins": len(dates), "first": dates[0], "last": dates[-1],
            "numbered": bool(re.fullmatch(r"(\d)\1{3}|ZZZZ", name)),
        })
    board_list.sort(key=lambda b: b["first"])
    for b in board_list:
        b["months"] = dict(collections.Counter(d[:7] for d in boards[b["name"]]))
    per_month = collections.Counter(p["Created at"][:7].replace("/", "-") for p in pins)

    q = []
    f = os.path.join(path, "search_history", "0001.html")
    if os.path.exists(f):
        lines = sar_lines(f)
        for i, l in enumerate(lines):
            if l.startswith("Query: "):
                q.append(l[7:].strip().lower())
    echo_q = [s for s in q if re.search(r"jungkook|jung kook|bts", s)]
    return {
        "totalPins": len(pins),
        "echoSearches": len(echo_q),
        "perYear": [{"year": y, "pins": n} for y, n in sorted(per_year.items())],
        "perMonth": dict(sorted(per_month.items())),
        "boards": board_list,
        "searchCount": len(q),
    }


# ---------------------------------------------------------------- Instagram
def instagram(path):
    J = lambda p: json.load(open(os.path.join(path, p), encoding="utf8"))
    Y = lambda t: datetime.datetime.fromtimestamp(t, TZ).year
    following = J("connections/followers_and_following/following.json")["relationships_following"]
    stories = J("your_instagram_activity/media/stories.json")["ig_stories"]
    posts = J("your_instagram_activity/media/posts.json")
    saved = J("your_instagram_activity/saved/saved_posts.json")
    liked = J("your_instagram_activity/likes/liked_posts.json")
    if isinstance(liked, dict):
        liked = list(liked.values())[0]
    M = lambda t: datetime.datetime.fromtimestamp(t, TZ).strftime("%Y-%m")
    def stamps(items):
        out = []
        for it in items:
            t = it.get("timestamp")
            for sd in it.get("string_list_data") or []:
                t = t or sd.get("timestamp")
            if t: out.append(t)
        return out
    monthly = {
        "liked": dict(collections.Counter(M(t) for t in stamps(liked))),
        "saved": dict(collections.Counter(M(x["timestamp"]) for x in saved)),
        "stories": dict(collections.Counter(M(x["creation_timestamp"]) for x in stories)),
    }
    tags = collections.Counter()
    for x in saved:
        for lv in x["label_values"]:
            if lv.get("title") == "Hashtags":
                for d in lv["dict"]:
                    tags[fix(d["dict"][0]["value"]).lower()] += 1
    viewed = J("ads_information/ads_and_topics/posts_viewed.json")
    videos = J("ads_information/ads_and_topics/videos_watched.json")
    ads = J("ads_information/ads_and_topics/ads_viewed.json")
    window = [x["timestamp"] for x in viewed + videos + ads]
    adv = J("ads_information/instagram_ads_and_businesses/advertisers_using_your_activity_or_information.json")
    adv_lists = [lv.get("vec", []) for lv in adv["label_values"]]
    adv_names = {fix(v["value"]) for vec in adv_lists for v in vec}
    return {
        "followingPerYear": [{"year": y, "n": n} for y, n in sorted(collections.Counter(Y(x["string_list_data"][0]["timestamp"]) for x in following).items())],
        "following": len(following),
        "posts": len(posts),
        "stories": len(stories),
        "saved": len(saved),
        "liked": len(liked),
        "topHashtags": [t for t, _ in tags.most_common(30)],
        "echoSaved": sum(1 for x in saved if any(
            lv.get("title") == "Hashtags" and any(re.search(r"jungkook|bts|정국|방탄", fix(d["dict"][0]["value"]).lower()) for d in lv["dict"])
            for lv in x["label_values"])),
        "viewWindow": [
            datetime.datetime.fromtimestamp(min(window), TZ).date().isoformat(),
            datetime.datetime.fromtimestamp(max(window), TZ).date().isoformat(),
        ],
        "postsViewed": len(viewed),
        "videosWatched": len(videos),
        "adsViewed": len(ads),
        "advertisers": len(adv_names),
        "monthly": monthly,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--spotify", required=True)
    ap.add_argument("--spotify-log")
    ap.add_argument("--pinterest", required=True)
    ap.add_argument("--instagram", required=True)
    ap.add_argument("--out", default="data/echoes-data.js")
    a = ap.parse_args()
    data = {
        "generated": datetime.date.today().isoformat(),
        "spotify": spotify(a.spotify, a.spotify_log),
        "pinterest": pinterest(a.pinterest),
        "instagram": instagram(a.instagram),
    }
    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    with open(a.out, "w", encoding="utf8") as fh:
        fh.write("/* Generado por herramientas/procesar_datos.py — datos agregados, sin exportaciones en bruto. */\n")
        fh.write("window.ECHOES_DATA = ")
        json.dump(data, fh, ensure_ascii=False, indent=1)
        fh.write(";\n")
    print("OK", a.out)


if __name__ == "__main__":
    main()
