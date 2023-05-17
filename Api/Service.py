INF= 10**7
def ParseData(lst:list):
    edges =[]
    adj_matrix=[]
    for el in lst:
        if el['group']=='edges':
            edges.append(el)
    for el in edges:
        adj_matrix.append({'from':int(el['data']['source'][1:]),'to':int(el['data']['target'][1:]), 'weight':int(el['data']['label'])})
    nodes = list(set([edge['data']['id'].split('-')[0].replace('n','') for edge in edges] + [edge['data']['id'].split('-')[1].replace('n','') for edge in edges]))
    N=len(nodes)
    new_list = [[INF for i in range(N)] for i in range(N)]
    for d in adj_matrix:
        new_list[d['from']-1][d['to']-1]=d['weight']

    return new_list