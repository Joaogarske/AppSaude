import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap"; // Importando os componentes do Bootstrap
import Logo from "../picture/logo.png"


export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      });

      if (response.data === "Usuário registrado com sucesso!") {
        navigate("/"); // Redireciona para a tela de login após cadastro bem-sucedido
      } else {
        setError(response.data); // Exibe erro caso ocorra
      }
    } catch (err) {
      setError("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
        <div className="text-center mb-4">
            <img
              src={Logo} // Substitua pelo URL da sua imagem
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "200px" }}  // Ajuste o tamanho da imagem conforme necessário
            />
          </div>

          <Form onSubmit={handleRegister} className="shadow p-4 rounded">
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escolha um nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Escolha uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button style={{backgroundColor:"green"}} type="submit" className="w-100">
              Cadastrar
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Retornar para o  <Link to="/">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
