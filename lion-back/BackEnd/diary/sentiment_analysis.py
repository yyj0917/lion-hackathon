import sys
import requests
import json

from django.utils import timezone
from datetime import timedelta
from .models import PrivateDiary

def sentimentAnalysis(content) :

    client_id = "si864t2no6"
    client_secret = "vqANYK9YmnSil4Iy6nYaY4qtKNYvESRsuaBlhB2t"
    url="https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"

    headers = {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type": "application/json"
    }

    data = {
    "content": content
    }

    # print(json.dumps(data, indent=4, sort_keys=True))
    response = requests.post(url, data=json.dumps(data), headers=headers) # 감정 분석 실행
    result = json.loads(response.text) # 분석 결과를 python dictionary 형태로 변환
    rescode = response.status_code

    if(rescode == 200):

        sentiment = result['document']['sentiment']
        confidence = result['document']['confidence']

        negative_contents = []
        for sentence in result['sentences'] :
            
            sentence_result = {
                'content': sentence['content'],
                'sentiment': sentence['sentiment'],
                'confidence': sentence['confidence']
            }

            negative_contents.append(sentence_result)

        return sentiment, confidence, negative_contents
    
    else:
        print("Error occured during sentiment analysis")


def collect_negative_sentences(user):
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=30)
    diaries = PrivateDiary.objects.filter(user=user, date__range=[start_date, end_date])
    negative_sentences = []
    for diary in diaries:
        for sentence in diary.highlights['sentences']:
            if sentence['confidence']['negative'] > sentence['confidence']['positive'] and sentence['confidence']['negative'] > sentence['confidence']['neutral']:
                negative_sentences.append(sentence['content'])
    return negative_sentences


def perform_kobert_analysis(sentences):
    # Kobert 모델을 호출하는 코드를 여기에 추가합니다.
    # 이 예제에서는 가상의 결과를 반환합니다.
    return {
        "detailed_sentiments": [
            {"sentence": sentence, "sentiment": "anger"} for sentence in sentences
        ]
    }




# 분석 결과는 dictionary 형태

# ├── 'document'    # 글 전체 감정 분석 결과
# │   ├── 'sentiment'
# │   └── 'confidence' ├── 'negative'
# │                    ├── 'positive'
# │                    └── 'neutral'
# │
# └── 'sentences' : [list로 구성]   # 글 하이라이트 감정 분석 결과 
#         │   
#         ├── 'content' 
#         ├── 'offset' # 문장 시작점
#         ├── 'length' # 문장 길이
#         ├── 'sentiment' 
#         ├── 'confidence' ├── 'negative'
#         │                ├── 'positive'
#         │                └── 'neutral'
#         │ 
#         ├── 'highlights' ├── 'offset'
#         │                └── 'length'      
#         └── ...
