from python_service import app
from python_service.rabbitmq_listener import listen_for_message_rabbitmq, start_listening
from python_service.rabbitmq_publisher import publish_message_to_rabbitmq


@app.route('/')
def home():
    return "Running"


@app.route('/send')
def send_json_to_java():
    data_json = {"name": "John", "age": 30}
    publish_message_to_rabbitmq(data_json)

    return "Sending"


@app.route('/listen')
def recieve_bytearray_from_java():
    start_listening()
    return "Listening..."


if __name__ == '__main__':
    # start_listening()
    app.run(port=5001)