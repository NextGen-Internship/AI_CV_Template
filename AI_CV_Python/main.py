from python_service import app, publish_message_to_rabbitmq


@app.route('/')
def home():
    return "Running"



if __name__ == '__main__':
    app.run(debug=True)