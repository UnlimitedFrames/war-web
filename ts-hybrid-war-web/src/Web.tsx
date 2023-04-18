import { DataSet } from "vis-data"
import { Network } from "vis-network"
export default function Web(props: { apikey: string | undefined, selected_nat: string | undefined }) {
    let selected_nat = props.selected_nat
    props.apikey && fetch('https://api.politicsandwar.com/graphql?api_key=' + props.apikey, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            query: `{
            wars(alliance_id:[4124, 9573, 8804, 5039, 7815, 4648, 11320, 913, 3427, 1742, 7531],active:true,first:1000){
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
            let warring_aas = [4124, 9573, 8804, 5039, 7815, 4648, 11320, 913, 3427, 1742, 7531]
            let nations = []
            let nation_ids: string[] = []
            let wars = []
            let allowed_ids: string[] = []
            if (selected_nat) {
                allowed_ids.push(selected_nat)
                res.data.wars.data.forEach((war: any) => {
                    if (war.attacker.id == selected_nat) allowed_ids.push(war.defender.id)
                    if (war.defender.id == selected_nat) allowed_ids.push(war.attacker.id)
                })

            }
            for (let war of res.data.wars.data) {
                if (war.attacker.alliance != null && war.defender.alliance != null) {
                    if (warring_aas.includes(parseInt(war.attacker.alliance.id)) && warring_aas.includes(parseInt(war.defender.alliance.id))) {
                        if (allowed_ids.includes(war.attacker.id) || allowed_ids.includes(war.defender.id)) {
                            if (!nation_ids.includes(war.attacker.id)) {
                                nations.push({ id: war.attacker.id, weight: war.attacker.num_cities, title: war.attacker.id, level: war.attacker.id == selected_nat ? 1 : war.defender.id == selected_nat ? 2 : 3, scaling: { min: 1, max: 30 }, value: war.attacker.num_cities, group: war.attacker.alliance.id, label: war.attacker.nation_name, shape: "circularImage", image: war.attacker.alliance.flag })
                                nation_ids.push(war.attacker.id)
                            }

                            if (!nation_ids.includes(war.defender.id)) {
                                nations.push({ id: war.defender.id, weight: war.attacker.num_cities * 10, title: war.defender.id, level: war.defender.id == selected_nat ? 1 : war.attacker.id == selected_nat ? 2 : 3, scaling: { min: 1, max: 30 }, value: war.defender.num_cities, group: war.defender.alliance.id, label: war.defender.nation_name, shape: "circularImage", image: war.defender.alliance.flag })
                                nation_ids.push(war.defender.id)
                            }

                            wars.push({ title: "war", arrows: 'middle', smooth: { type: "continuous" }, from: war.attacker.id, to: war.defender.id, id: war.id, width: war.turns_left / 12 })

                        }
                    }
                }
            }

            var nodes = new DataSet(nations)
            var edges = new DataSet(wars);


            var container = document.getElementById("network");
            var data = {
                nodes: nodes,
                edges: edges,

            };


            var options = {};
            new Network(container as HTMLElement, data as any, options)
        })
    return (<div id='network' style={{ width: "1200px", height: "700px", position: "sticky", left: "0px", top: "5px", backgroundColor: "#6da177" }}></div >
    )
}
