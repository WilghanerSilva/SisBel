import { useEffect, useState } from "react"
import { Agendamento } from "../../types/AgendamentoType";
import api from "../../services/api";
import "./style.css";

interface Props {
  userId: string,
  mes: number
}

export function AgendamentoTable (props: Props) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [dia, setDia] = useState(new Date().getDate());
  const diasDaSemana: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const horarios: string[] = ["08:00", "09:00", "10:00", "11:00", "13:00", "16:00"];
  const mesesDoAno: string[] = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const listarDiasDaSemana = (dia: number) => {
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const data = new Date();
    const mesAtual = data.getMonth();
    const anoAtual = data.getFullYear();
    const diasAssociados = [];

    data.setDate(dia);

    const primeiroDiaSemana = data.getDay();

    for (let i = 0; i < 7; i++) {
      const dataSemana = new Date(anoAtual, mesAtual, data.getDate() - (primeiroDiaSemana - i));
      const diaSemana = diasDaSemana[dataSemana.getDay()];
      const diaMes = dataSemana.getDate();
      diasAssociados.push({diaMes, diaSemana});
    }

    return diasAssociados;
}

  useEffect(() => {
    if(props.userId){
      api.post("/agendamento/listar-agendamentos", {id:props.userId})
        .then(response => {
          console.log(response.data);
          const data = response.data;
          setAgendamentos(data)
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [props.userId])

  useEffect(() => {
    if(props.userId){
      api.post("/agendamento/listar-agendamentos", {id:props.userId})
        .then(response => {
          console.log(response.data.data);
          setAgendamentos(response.data.data)
        })
        .catch(error => {
          console.error(error);
        })
    }
  },[])

  return (
 
    <div className="table-container">
      <table className="agendamento-table">
        <thead>
          <th>{mesesDoAno[props.mes]}</th>
          {
            diasDaSemana.map(
              diaDaSemana => {
                const dias = listarDiasDaSemana(dia);
                const diaFiltrado = dias.find(item => item.diaSemana === diaDaSemana);
                
                return <th>{`${diaDaSemana}, ${diaFiltrado?.diaMes}`}</th>
              }
            )
          }
        </thead>
        <tbody>
          {
            horarios.map((horario, horarioIndex) => (
              <tr>
                <td key={horarioIndex}>{horario}</td>
                {
                  diasDaSemana.map((diaDaSemana, diaDaSemanaIndex) => {
                    const diasAssociados = listarDiasDaSemana(dia);
                    const diaFiltrado = diasAssociados.find(dia => dia.diaSemana === diaDaSemana);
                    let agendamentoFiltrado = undefined;
                    if(agendamentos.length > 0){
                      agendamentoFiltrado = agendamentos.find(agendamento => {
                        const agendamentoDate = new Date(agendamento.data);
                        return agendamentoDate.getDate() === diaFiltrado?.diaMes && agendamentoDate.getMonth() === props.mes && agendamento.horario === horario
                      })
                    }
                    
                    return agendamentoFiltrado ? <td className="ocupado">{" "}</td> : <td>{" "}</td>
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}