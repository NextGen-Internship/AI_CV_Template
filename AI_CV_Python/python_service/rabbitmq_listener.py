import pika
import json
import threading
from python_service.ai import handle_cv


def on_message_received(ch, method, properties, body):
    # bytearray_to_string = body.decode('utf-8')
    print("Received message:", body.decode('utf-8'))
    # handle_cv(bytearray_to_string)


def listen_for_message_rabbitmq():
    connection_parameters = pika.ConnectionParameters(
        host='localhost',  # Replace with your RabbitMQ server host
        port=5672,  # Replace with RabbitMQ server port if different
        credentials=pika.credentials.PlainCredentials(
            username='guest',  # Replace with your RabbitMQ username
            password='guest'  # Replace with your RabbitMQ password
        )
    )
    connection = pika.BlockingConnection(connection_parameters)
    channel = connection.channel()
    channel.queue_delete(queue='javaguides')
    channel.queue_declare(queue='javaguides', durable=True)
    channel.basic_consume(queue='javaguides', auto_ack=False, on_message_callback=on_message_received)

    print("Start consuming")
    channel.start_consuming()


def start_listening():
    thread = threading.Thread(target=listen_for_message_rabbitmq)
    thread.start()

