import pika
import json


def publish_message_to_rabbitmq(data):
    data_to_string = json.dumps(data)
    connection_parameters = pika.ConnectionParameters('localhost')
    connection = pika.BlockingConnection(connection_parameters)
    channel = connection.channel()
    channel.queue_declare(queue='json-queue')

    channel.basic_publish(exchange='', routing_key='json-queue', body=data_to_string)

    print(f"Send message: {data_to_string}")

    connection.close()