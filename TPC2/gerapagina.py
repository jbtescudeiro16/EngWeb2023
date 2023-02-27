import json


def aux(cidade):

    return cidade["nome"]

f = open("mapa.json")
#este mapa é um dicionario com duas entradas (ligacoes e cidades)
mapa = json.load(f)
f.close()

city = mapa["cidades"]
city.sort(key=aux)

ligacoes = mapa["ligações"]



def convert(id):

    for c in city:

        if (c['id'] == id):

            return c['nome']

    return None

def search_destinations(city):
    res = list()

    for l in ligacoes:

        if (l['origem'] == city):

            res.append((l['destino'],l['distância']))

    return res


def getconnections(id):

    res = ""

    aux = search_destinations(id)

    for dest in aux:

        res += f"<p><a href=/{dest[0]}>{convert(dest[0])}</a>: {dest[1]}</p>"

    return res

#falta as ligações
def gerahtmlCity(cidade):

    res = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cidade1</title>
</head>
<body>
    <h1>{cidade['nome']}</h1>
    <p>População: {cidade['população']}</p>
    <p>Descrição: {cidade['descrição']}</p>
    <p>Distrito: {cidade['distrito']}</p>
    <p><b>Destinos proximos:</b></p>
    {getconnections(cidade['id'])}


    
</body>
</html>
    """

    return res


def geraPageCity(cidade):

    f = open(f"citypages/{cidade['id']}.html", "w")

    f.write(gerahtmlCity(cidade))

    f.close()



def geraAll():

    for cidade in city:

        geraPageCity(cidade)


def main():
    geraAll()

main()