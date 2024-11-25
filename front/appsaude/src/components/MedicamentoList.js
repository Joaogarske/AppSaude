import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navegacao } from "./Navegacao";
import { Card, Button, Modal, Row, Col, Form } from "react-bootstrap"; // Importando componentes do React-Bootstrap
import { useUser } from "../context/UserProvider";
export function MedicamentoList() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);  // Para controlar a exibição do modal
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);  // Para armazenar o medicamento selecionado
  const [isEditing, setIsEditing] = useState(false); // Controla se está no modo de edição
  const {user} = useUser()
  useEffect(() => {
    // Pega o nome de usuário armazenado na sessão (caso você tenha implementado login)
    const username = user; // Exemplo, você vai pegar do estado do login ou sessão

    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/medicamento/list?username=${username}`
        );
        setMedicamentos(response.data); // Exibe os medicamentos para o usuário
      } catch (err) {
        console.error("Erro ao carregar medicamentos", err);
      }
    };

    fetchMedicamentos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/medicamento/delete?id=${id}`);
      setMedicamentos(medicamentos.filter((med) => med.id !== id)); // Remove da lista
      handleCloseModal()
    } catch (err) {
      console.error("Erro ao excluir medicamento", err);
    }
  };

  const handleShowModal = (medicamento) => {
    setSelectedMedicamento(medicamento); // Define o medicamento selecionado
    setShowModal(true);  // Exibe o modal
    setIsEditing(false); // Inicia no modo de visualização
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Fecha o modal
    setSelectedMedicamento(null);  // Limpa o medicamento selecionado
    setIsEditing(false); // Reseta o modo de edição
  };

  const handleEdit = () => {
    setIsEditing(true); // Ativa o modo de edição
  };

  const handleSave = async () => {
    try {
      const updatedMedicamento = {
        ...selectedMedicamento,
        nome: selectedMedicamento.nome, // Certifique-se de que o nome foi alterado nos inputs
        dosagem: selectedMedicamento.dosagem,
        horario: selectedMedicamento.horario,
      };

      // Envia a atualização para o backend
      await axios.put(`http://localhost:8080/api/medicamento/update?id=${selectedMedicamento.id}`, updatedMedicamento);
      setMedicamentos(medicamentos.map((med) => (med.id === selectedMedicamento.id ? updatedMedicamento : med))); // Atualiza a lista local
      setShowModal(false);  // Fecha o modal
    } catch (err) {
      console.error("Erro ao salvar medicamento", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMedicamento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navegacao />
      <h2 style={{textAlign:"center",marginTop:"30px"}}>Lista de Medicamentos</h2>
      <div className="d-flex flex-wrap">
        {/* Mapeia os medicamentos e exibe em cards */}
        {medicamentos.map((med) => (
          <Card key={med.id} style={{ width: '100%', margin: '1rem' }}>
            <Card.Body>
              {/* Nome do Medicamento */}
              <Card.Title>{med.nome}</Card.Title>
              <Row className="d-flex justify-content-between align-items-center">
                {/* Dosagem e Horário ao lado do botão de Detalhes, com espaçamento igual */}
                <Col xs={3}>
                  <Card.Text>{med.dosagem}</Card.Text>
                </Col>
                <Col xs={3}>
                  <Card.Text>{med.horario}</Card.Text>
                </Col>
                <Col xs={4} className="text-right">
                  <Button style={{backgroundColor:"green"}} onClick={() => handleShowModal(med)}>
                    Detalhes
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal de detalhes do medicamento */}
      {selectedMedicamento && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMedicamento.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={selectedMedicamento.nome}
                  onChange={handleChange}
                  disabled={!isEditing} // Desabilita o input se não estiver no modo de edição
                />
              </Form.Group>

              <Form.Group controlId="formDosagem">
                <Form.Label>Dosagem</Form.Label>
                <Form.Control
                  type="text"
                  name="dosagem"
                  value={selectedMedicamento.dosagem}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="formHorario">
                <Form.Label>Horário</Form.Label>
                <Form.Control
                  type="time"
                  name="horario"
                  value={selectedMedicamento.horario}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* Alterar/Salvar botão */}
            <Button variant="primary" onClick={isEditing ? handleSave : handleEdit}>
              {isEditing ? "Salvar" : "Alterar"}
            </Button>
            <Button variant="danger" onClick={() => handleDelete(selectedMedicamento.id)}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
