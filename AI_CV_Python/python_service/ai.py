from openai import OpenAI
from python_service.rabbitmq_publisher import publish_message_to_rabbitmq
from python_service import app
import os
import json
from dotenv import load_dotenv

def handle_cv(cv):
    app.secret_key = os.getenv('OPENAI_API_KEY')
    # print(app.secret_key)
    client = OpenAI(api_key=app.secret_key)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
                "content": "You are given a cv, please check for the misspellings or wrong words replace it with the "
                "right word,please double check for Seattle ,  extract the name,"
                "summary,"
                "previous work ,please double check is it previous work or experience, not part of education "
                "experience as experience,about the experience extract the role or title as role, company or "
                "institution as company, start year, end year separate as start_year and end_year,"
                "and responsibilities, summary or description as description"
                "the skills, SKILLS or technologies as technologies,the skills can includes back-end, "
                "front-end languages, databases, message brokers, deployment technologies, source control and "
                "build tools and etc.,please extract only technical skills, education, about the education "
                "extract the"
                "degree, college,courses(like Softuni, Telerik, CodeAcademy or etc.) or institution as "
                "college and"
                "the start"
                "year and end year separate as start_year and end_year,"
                "and the role of the last"
                "company in a json format,and only blankfactor gmail as gmail, don't send anything else that "
                "is not specified"},
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
