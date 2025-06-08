from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship

# Thi is the flask app setup
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///metmuseum.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# These are the association tables 
artwork_exhibitions = db.Table('artwork_exhibitions',
    db.Column('objectID', db.Integer, db.ForeignKey('artworks.objectID'), primary_key=True),
    db.Column('exhibitionId', db.Integer, db.ForeignKey('exhibitions.exhibitionId'), primary_key=True)
)

artwork_artists = db.Table('artwork_artists',
    db.Column('objectID', db.Integer, db.ForeignKey('artworks.objectID'), primary_key=True),
    db.Column('artistId', db.String, db.ForeignKey('artists.artistId'), primary_key=True)
)

# These are the models 
class Artwork(db.Model):
    __tablename__ = 'artworks'
    objectID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    objectDate = db.Column(db.String)
    medium = db.Column(db.String)
    dimensions = db.Column(db.String)
    creditLine = db.Column(db.String)
    primaryImage = db.Column(db.String)
    accessionYear = db.Column(db.String)
    exhibitions = db.relationship('Exhibition', secondary=artwork_exhibitions, backref='artworks')
    artists = db.relationship('Artist', secondary=artwork_artists, backref='artworks')

class Exhibition(db.Model):
    __tablename__ = 'exhibitions'
    exhibitionId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique=True)
    floor = db.Column(db.String)
    description = db.Column(db.String)

class Artist(db.Model):
    __tablename__ = 'artists'
    artistId = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    nationality = db.Column(db.String)
    lifespan = db.Column(db.String)

# These are the API routes 

@app.route('/exhibitions', methods=['GET'])
def get_exhibitions():
    exhibitions = Exhibition.query.all()
    return jsonify([
        {
            'exhibitionId': e.exhibitionId,
            'name': e.name,
            'floor': e.floor,
            'description': e.description,
            'artworkCount': len(e.artworks)
        } for e in exhibitions
    ])

@app.route('/exhibitions/<int:exhibition_id>/artworks', methods=['GET'])
def get_artworks_by_exhibition(exhibition_id):
    exhibition = Exhibition.query.get_or_404(exhibition_id)
    return jsonify([
        {
            'objectID': art.objectID,
            'title': art.title,
            'primaryImage': art.primaryImage,
            'artist': art.artists[0].name if art.artists else "Unknown"
        } for art in exhibition.artworks
    ])

@app.route('/artworks/<int:object_id>', methods=['GET'])
def get_artwork_details(object_id):
    artwork = Artwork.query.get_or_404(object_id)
    return jsonify({
        'objectID': artwork.objectID,
        'title': artwork.title,
        'objectDate': artwork.objectDate,
        'medium': artwork.medium,
        'dimensions': artwork.dimensions,
        'creditLine': artwork.creditLine,
        'primaryImage': artwork.primaryImage,
        'accessionYear': artwork.accessionYear,
        'artists': [{
            'name': artist.name,
            'nationality': artist.nationality,
            'lifespan': artist.lifespan
        } for artist in artwork.artists],
        'exhibitions': [e.name for e in artwork.exhibitions]
    })

@app.route('/artists', methods=['GET'])
def list_artists():
    artists = Artist.query.all()
    return jsonify([{
        'artistId': a.artistId,
        'name': a.name,
        'nationality': a.nationality,
        'lifespan': a.lifespan,
        'artworkCount': len(a.artworks)
    } for a in artists])

@app.route('/artists/<string:artist_id>/artworks', methods=['GET'])
def get_artist_artworks(artist_id):
    artist = Artist.query.get_or_404(artist_id)
    return jsonify([{
        'objectID': a.objectID,
        'title': a.title,
        'primaryImage': a.primaryImage
    } for a in artist.artworks])

# This is how you will run the backend database

if __name__ == '__main__':
    import os
    print("🔗 Connected to:", os.path.abspath("metmuseum.db"))
    app.run(debug=True)
