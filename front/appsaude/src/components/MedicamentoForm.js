import React, { useState } from "react";
import axios from "axios";
import { Navegacao } from "./Navegacao";
import { useUser } from "../context/UserProvider";
import { Form, Button, Container, Alert } from "react-bootstrap"; // Importando componentes do React-Bootstrap
import {  toast } from "react-toastify"; // Importando o ToastContainer e toast do react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importando os estilos do toast

export function MedicamentoForm() {
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [horario, setHorario] = useState("");
  const [error, setError] = useState("");
  const {user} = useUser()


  const handleRegisterMedicamento = async (e) => {
    e.preventDefault();

    // Pega o nome de usuário armazenado na sessão (caso você tenha implementado login)
    const username = user ; // Exemplo, você vai pegar do estado do login ou sessão

    try {
      const response = await axios.post(
        `http://localhost:8080/api/medicamento/add?username=${username}`,
        {
          nome,
          dosagem,
          horario,
        }
      );

      if (response.data === "Medicamento registrado com sucesso!") {
        // Exibe o toast de sucesso
        toast.success("Medicamento registrado com sucesso!");
        setNome(""); // Limpa os campos após o sucesso
        setDosagem("");
        setHorario("");
      } else {
        setError(response.data);
      }
    } catch (err) {
      setError("Erro ao cadastrar medicamento.");
    }
  };

  return (
    <div>
      <Navegacao />
      <Container className="mt-5">
        <h2 className="text-center">Cadastrar Medicamento</h2>

        {/* Exibe mensagem de erro, se houver */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegisterMedicamento}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome Medicamento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do medicamento"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDosagem">
            <Form.Label>Dosagem</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a dosagem do medicamento"
              value={dosagem}
              onChange={(e) => setDosagem(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formHorario">
            <Form.Label>Horário</Form.Label>
            <Form.Control
              type="time"  // Definindo tipo como time
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
            />
          </Form.Group>

          <Button style={{backgroundColor:"green"}} className="mt-3"  type="submit" >
            Cadastrar Medicamento
          </Button>
        </Form>

       
      </Container>
    </div>
  );
}
