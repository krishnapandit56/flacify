import sys
import json
from pymongo import MongoClient
from bson import json_util  # To handle ObjectId and other BSON types

# Read preferences from stdin
input_data = sys.stdin.read()
user_preferences = json.loads(input_data)

# Connect to MongoDB
client = MongoClient("mongodb+srv://krishnapandit52005:krishnafirstfullstack@cluster0.hm1qbuj.mongodb.net/flacify?retryWrites=true&w=majority&appName=Cluster0")
db = client["flacify"]
songs_collection = db["songs"]

# Collect all matched songs with flexible language handling
all_results = []

for pref in user_preferences:
    # Find songs with matching mood and genre (ignore language for now)
    partial_query = {
        "mood": {"$regex": f"^{pref['mood']}$", "$options": "i"},
        "genre": {"$regex": f"^{pref['genre']}$", "$options": "i"},
    }

    matched_songs = songs_collection.find(partial_query)
    
    # Score and store results
    for song in matched_songs:
        score = 2  # base score for mood + genre match

        # Bonus point if language matches
        if 'language' in song and song['language'].lower() == pref['language'].lower():
            score += 1
        
        all_results.append((score, song))

# Sort results by score (higher is better)
all_results.sort(reverse=True, key=lambda x: x[0])

# Remove duplicates (based on _id) and limit to 20
seen_ids = set()
final_songs = []
for score, song in all_results:
    if song['_id'] not in seen_ids:
        final_songs.append(song)
        seen_ids.add(song['_id'])
    if len(final_songs) >= 20:
        break

# Return JSON
print(json_util.dumps(final_songs))
