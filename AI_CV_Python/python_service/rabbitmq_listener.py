import pika
import json
import threading
from python_service.ai import handle_cv


def on_message_received(ch, method, properties, body):
    # print("recieved new message") 
    bytearray_to_string = body.decode('utf-8')
    print(bytearray_to_string) 
    handle_cv(bytearray_to_string)



def listen_for_message_rabbitmq():
    connection_parameters = pika.ConnectionParameters('localhost')
    connection = pika.BlockingConnection(connection_parameters)
    channel = connection.channel()
    channel.queue_declare(queue='bytearray-queue')
    channel.basic_consume(queue='bytearray-queue', auto_ack=True, on_message_callback=on_message_received)

    print("Start consuming")
    channel.start_consuming()


def start_listening():
    thread = threading.Thread(target=listen_for_message_rabbitmq)
    thread.start()

