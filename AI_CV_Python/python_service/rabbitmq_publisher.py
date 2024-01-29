import pika
import json


def publish_message_to_rabbitmq(data):
    data_to_string = json.dumps(data)
    connection_parameters = pika.ConnectionParameters('localhost')
    connection = pika.BlockingConnection(connection_parameters)
    channel = connection.channel()
    channel.exchange_declare(exchange='exchange.python', exchange_type='topic', durable=True)
    channel.queue_declare(queue='json.python', durable=True)
    channel.queue_bind(exchange='exchange.python', queue='json.python', routing_key='publish.message')
    channel.basic_publish(exchange='exchange.python', routing_key='publish.message', body=data_to_string)
    print(f"Send message: {data_to_string}")
    connection.close()
