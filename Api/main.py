from fastapi import FastAPI
import algorithm
import uvicorn
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from Service import ParseData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.post('/floyd')
def floyd(lst: Dict[Any, Any]):
    V = ParseData(lst.get('lst'))
    _from = int(lst.get('from'))
    _to = int(lst.get('to'))

    result = algorithm.get_result(V, _from, _to)
    return result


@app.post('/get_distances')
def get_distances(lst: Dict[Any, Any]):
    V = ParseData(lst.get('lst'))
    result = algorithm.get_arr_of_distances(V)
    return result


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
