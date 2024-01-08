from openai import OpenAI
from python_service.rabbitmq_consumer import publish_message_to_rabbitmq

def handle_cv(cv):
    OPENAI_API_KEY="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"
    client = OpenAI(api_key=OPENAI_API_KEY)
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are given a cv, can you extract the name, age, previouse experience, the skills and the education in a json format"},
        {"role": "user", "content": cv}
    ],
    stream=True,
    )

    processed_data = ""

    for chunk in completion:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")
            processed_data += chunk.choices[0].delta.content

    processed_data_json = json.loads(processed_data)    
    publish_message_to_rabbitmq(processed_data_json)    

