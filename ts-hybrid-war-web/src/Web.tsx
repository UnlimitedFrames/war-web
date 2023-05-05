import { DataSet } from "vis-data"
import { Network } from "vis-network"

interface webProps { apikey: string, id: string, natOrAA: boolean, setisLoading: any, setError: any }
export default function web(props: webProps) {
    props.setisLoading(true)
    props.setError(undefined)
    const container = document.getElementById("network");


    let id = props.id

    props.apikey && fetch('https://api.politicsandwar.com/graphql?api_key=' + props.apikey, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            query: `{
        wars(`+ (props.natOrAA ? ("nation_id") : ("alliance_id")) + `:[` + id + `],active:true,first:1000){
        data{

  attacker{
    nation_name
    id
    num_cities

    alliance{id
      flag}

  }
defender{
  nation_name
  id
  num_cities

  alliance{id
    flag
  }
}
turns_left
}    
}
}
`
        })
    })
        .then(res => res.json())
        .then(res => {

            res.errors &&
                props.setError(res.errors[0].message)


            let nations = []
            let nation_ids: string[] = []
            let wars = []
            let allowed_ids: string[] = []


            for (let war of res.data.wars.data) {
                if (war.attacker.alliance != null && war.defender.alliance != null) {
                    if (allowed_ids.length == 0 || allowed_ids.includes(war.attacker.id) || allowed_ids.includes(war.defender.id)) {
                        if (!nation_ids.includes(war.attacker.id)) {
                            nations.push({ id: war.attacker.id, weight: war.attacker.num_cities, title: war.attacker.id, scaling: { min: 5, max: 35 }, value: war.attacker.num_cities, group: war.attacker.alliance.id, label: war.attacker.nation_name, shape: "circularImage", image: war.attacker.alliance.flag })
                            nation_ids.push(war.attacker.id)
                        }

                        if (!nation_ids.includes(war.defender.id)) {
                            nations.push({ id: war.defender.id, weight: war.attacker.num_cities * 10, title: war.defender.id, scaling: { min: 5, max: 35 }, value: war.defender.num_cities, group: war.defender.alliance.id, label: war.defender.nation_name, shape: "circularImage", image: war.defender.alliance.flag })
                            nation_ids.push(war.defender.id)
                        }

                        wars.push({ title: "war", arrows: 'middle', smooth: { type: "continuous" }, from: war.attacker.id, to: war.defender.id, id: war.id, width: war.turns_left / 12 })


                    }
                }
            }

            var nodes = new DataSet(nations)
            var edges = new DataSet(wars);


            var data = {
                nodes: nodes,
                edges: edges,

            };


            var options = {};
            new Network(container as HTMLElement, data as any, options)
            props.setisLoading(false)
        })
}
