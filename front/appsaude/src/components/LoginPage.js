import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap"; // Importando os componentes do Bootstrap
import Logo from "../picture/logo.png"
import { useUser } from "../context/UserProvider";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useUser()
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envia o nome de usuário e a senha para o backend
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      // Verifica se o login foi bem-sucedido
      if (response.data === "Login bem-sucedido") {
        // Redireciona para a home após o login bem-sucedido
        console.log(username)
        login(username)
        navigate("/home", {replace:true});
      } else {
        setError("Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao fazer login.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          {/* Imagem acima do formulário de login */}
          <div className="text-center mb-4">
            <img
              src={Logo} // Substitua pelo URL da sua imagem
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "200px" }}  // Ajuste o tamanho da imagem conforme necessário
            />
          </div>
          
          <Form onSubmit={handleLogin} className="shadow p-4 rounded">
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button style={{backgroundColor:"green"}} type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
