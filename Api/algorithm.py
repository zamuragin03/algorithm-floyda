MAXM,INF = 100,10**7

dis = [[-1 for i in range(MAXM)] for i in range(MAXM)]
Next = [[-1 for i in range(MAXM)] for i in range(MAXM)]

def initialise(graph):
	N =len(graph)
	for i in range(N):
		for j in range(N):
			dis[i][j] = graph[i][j]
			if (graph[i][j] == INF):
				Next[i][j] = -1
			else:
				Next[i][j] = j

def constructPath(u, v):
	u-=1
	v-=1
	if (Next[u][v] == -1):
		return {}
	path = [u]
	while (u != v):
		u = Next[u][v]
		path.append(u)

	return path


def getPath(path):
    return [el+1 for el in path]

def get_price(u,v):
	u-=1
	v-=1
	if u==v:
		return 0
	return dis[u][v]
	
def floydWarshall(V):
	for k in range(V):
		for i in range(V):
			for j in range(V):
				if (dis[i][k] == INF or dis[k][j] == INF):
					continue
				if (dis[i][j] > dis[i][k] + dis[k][j]):
					dis[i][j] = dis[i][k] + dis[k][j]
					Next[i][j] = Next[i][k]

def get_result(graph, start, end):
	initialise(graph)

	floydWarshall(len(graph))
	
	path = constructPath(start, end)
	
	arr_dist = [[0 for i in range(len(graph))] for i in range(len(graph))]
	for i in range(len(graph)):
		for j in range(len(graph)):
			arr_dist[i][j]=get_price(i+1,j+1)
	
	return {
		'path':getPath(path),
        'price':get_price(start,end),
        'dis':arr_dist
	}






