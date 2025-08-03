from flask import Flask, request
from pymongo import MongoClient
from bson import json_util
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins (customize if needed)

client = MongoClient("mongodb+srv://krishnapandit52005:krishnafirstfullstack@cluster0.hm1qbuj.mongodb.net/flacify?retryWrites=true&w=majority&appName=Cluster0")
db = client["flacify"]
songs_collection = db["songs"]

@app.route('/recommend', methods=['POST'])
def recommend():
    user_preferences = request.json.get("preferences", [])

    if not user_preferences:
        random_songs = list(songs_collection.aggregate([{"$sample": {"size": 12}}]))
        return json.loads(json_util.dumps(random_songs))

    all_results = []
    for pref in user_preferences:
        partial_query = {
            "mood": {"$regex": f"^{pref['mood']}$", "$options": "i"},
            "genre": {"$regex": f"^{pref['genre']}$", "$options": "i"},
        }

        matched_songs = songs_collection.find(partial_query)
        
        for song in matched_songs:
            score = 2
            if 'language' in song and song['language'].lower() == pref['language'].lower():
                score += 1
            all_results.append((score, song))

    all_results.sort(reverse=True, key=lambda x: x[0])
    seen_ids = set()
    final_songs = []
    for score, song in all_results:
        if song['_id'] not in seen_ids:
            final_songs.append(song)
            seen_ids.add(song['_id'])
        if len(final_songs) >= 20:
            break

    return json.loads(json_util.dumps(final_songs))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
