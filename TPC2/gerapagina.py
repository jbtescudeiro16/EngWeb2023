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

districts = list(set([x["distrito"] for x in city]))
districts.sort()





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


def getcitiesDistrict(distrito):

    res = []

    for c in city:

        if (c["distrito"] == distrito):

            res.append((c["id"],c["nome"]))

    return res


def geraHTMLIndex():

    res = """<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cidades</title>
            </head>
            <body>\n"""

    for d in districts:

        res += f"<h1>{d}</h1><ul>\n"

        cidades_aux = getcitiesDistrict(d)

        for c_id,c_nome in cidades_aux:

            res += f"<li><a href='/{c_id}' target='blank'>{c_nome}</a></li>\n"

        res += "</ul>"

    res += "</body></html>"

    return res

def geraindex():

    f = open("index.html", "w")

    f.write(geraHTMLIndex())

    f.close()



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
    geraindex()
    geraAll()

main()