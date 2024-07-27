import sys
import requests
import json

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

        return sentiment, confidence
    
    else:
        print("Error occured during sentiment analysis")




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
