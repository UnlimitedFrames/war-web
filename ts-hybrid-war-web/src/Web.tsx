import { DataSet } from "vis-data"
import { Network } from "vis-network"


type warWithWars = {
    attacker: warNatWithWars,
    defender: warNatWithWars,
    turns_left: number,
    id: string
}
type war = {
    attacker: warNat,
    defender: warNat,
    turns_left: number
    id: string
}
type warNatWithWars = {
    nation_name: string,
    id: string,
    num_cities: number,
    alliance: alliance
    wars?: any[]
}
type warNat = {
    nation_name: string,
    id: string,
    num_cities: number,
    alliance: alliance
}
type alliance =
    {
        id: string,
        flag: string
    } | null
interface webProps { apikey: string, id: string, natOrAA: boolean, setisLoading: any, setError: any, level: number }
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
            query: props.level == 1 ? level1(props) : props.level == 2 ? level2(props) : level3(props)
        })
    })
        .then(res => res.json())
        .then(res => {
            res.errors &&
                props.setError(res.errors[0].message)
            let totalWars: war[] = []
            res.data.wars.data.forEach(
                (war: warWithWars) => {
                    war.attacker?.wars && war.attacker.wars.forEach((war2: warWithWars) => {
                        war2.attacker?.wars && war2.attacker.wars.forEach((war3: warWithWars) => {
                            totalWars.push(war3)
                        })
                        war2.defender?.wars && war2.defender.wars.forEach((war3: warWithWars) => {
                            totalWars.push(war3)
                        })
                        totalWars.push(war2)

                    })
                    war.defender?.wars && war.defender.wars.forEach((war2: warWithWars) => {
                        war2.attacker.wars && war2.attacker.wars.forEach((war3: warWithWars) => {
                            totalWars.push(war3)
                        })
                        war2.defender?.wars && war2.defender.wars.forEach((war3: warWithWars) => {
                            totalWars.push(war3)
                        })

                        totalWars.push(war2)

                    }
                    )
                    totalWars.push(war)
                }
            )

            let nations: any[] = []
            let wars: any[] = []



            loadWars(nations, wars, totalWars)

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

function loadWars(nations: any, wars: any, data: any) {
    let nation_ids: string[] = []
    let allowed_ids: string[] = []
    let doneWars: string[] = []
    data.forEach((war: war) => {
        if (!doneWars.includes(war.id) && war.attacker.alliance != null && war.defender.alliance != null) {
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
                doneWars.push(war.id)

            }
        }
    })
    return ({ nations, wars, nation_ids, allowed_ids })
}


function level1(props: webProps) {
    return (`{
        wars(`+ (props.natOrAA ? ("nation_id") : ("alliance_id")) + `:[` + props.id + `],active:true,first:1000){
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
id
}    
}
}
  `
    )
}
function level2(props: webProps) {
    return (`{
    wars(`+ (props.natOrAA ? ("nation_id") : ("alliance_id")) + `:[` + props.id + `], active: true, first: 1000) {
      data {
        attacker {
          nation_name
          id
          num_cities
          alliance {
            id
            flag
          }
          wars(active: true){
            attacker {
          nation_name
          id
          num_cities
          alliance {
            id
            flag
          }
        }
        defender {
          nation_name
          id
          num_cities
          alliance {
            id
            flag
          }
        }
        turns_left
        id
          }
        }
        defender {
          nation_name
          id
          num_cities
          alliance {
            id
            flag
          }
          wars(active: true){
            attacker {
          nation_name
          id
          num_cities
          alliance {
            id
            flag
          }
        }
        defender {
          nation_name
          id
          num_cities
          alliance {
            id
            flag
          }
        }
        turns_left
        id
          }
        }
        turns_left
        id
      }
    }
  }
  `
    )
}
function level3(props: webProps) {
    return (`{
        wars(`+ (props.natOrAA ? ("nation_id") : ("alliance_id")) + `:[` + props.id + `], active: true, first: 1000) {
            data {
            attacker {
              nation_name
              id
              num_cities
                      wars(active: true) {
              attacker {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
                wars(active: true){
                  attacker {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              defender {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              turns_left
              id
                }
              }
              defender {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
                wars(active: true){
                  attacker {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              defender {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              turns_left
              id
                }
              }
              turns_left
              id
            }
              alliance {
                id
                flag
              }
            }
            defender {
              nation_name
              id
              num_cities
                      wars (active: true){
              attacker {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
                wars(active: true){
                  attacker {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              defender {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              turns_left
              id
                }
              }
              defender {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
                wars(active: true){
                  attacker {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              defender {
                nation_name
                id
                num_cities
                alliance {
                  id
                  flag
                }
              }
              turns_left
              id
                }
              }
              turns_left
              id
            }
              alliance {
                id
                flag
              }
            }
            turns_left
            id
          }
        }
      }      
  `
    )
}
