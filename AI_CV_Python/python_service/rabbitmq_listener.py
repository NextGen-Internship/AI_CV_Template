import pika
import json
import threading
from python_service.ai import handle_cv

def convert_message(message):
    return message.decode('utf-8')
    

def on_message_received(ch, method, properties, body):
    to_string = convert_message(body)
    print("Received message:", to_string)
    handle_cv(to_string)


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

