from flask import Flask, request, jsonify
from flask_cors import CORS
import util
import os

app = Flask(__name__)
CORS(app)

# Load model & columns at startup
util.load_saved_artifacts()


@app.route('/')
def home():
    return "Bengaluru House Price Prediction API is Running 🚀"


@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    return jsonify({
        'locations': util.get_location_names()
    })


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()

    try:
        sqft = float(data['total_sqft'])
        location = data['location']
        bhk = int(data['bhk'])
        bath = int(data['bath'])

        price = util.get_estimated_price(location, sqft, bhk, bath)

        return jsonify({
            'estimated_price': price
        })

    except Exception as e:
        return jsonify({
            'error': str(e)
        })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))