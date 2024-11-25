package com.example.appsaude.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.appsaude.model.CadMedicamento;
import com.example.appsaude.model.User;
import com.example.appsaude.service.CadMedicamentoService;
import com.example.appsaude.service.UserService;

@RestController
@RequestMapping("/api/medicamento")
public class MedicamentoController {

    @Autowired
    private CadMedicamentoService cadMedicamentoService;

    @Autowired
    private UserService userService;

    // Registrar medicamento
    @PostMapping("/add")
    public String addMedicamento(@RequestBody CadMedicamento medicamento, @RequestParam String username) {
        User user = userService.authenticateUser(username);
        if (user != null) {
            medicamento.setUser(user);
            cadMedicamentoService.registerMedicamento(medicamento);
            return "Medicamento registrado com sucesso!";
        }
        return "Usuário não encontrado!";
    }

    // Listar medicamentos
    @GetMapping("/list")
    public List<CadMedicamento> listMedicamentos(@RequestParam String username) {
        User user = userService.authenticateUser(username);
        if (user != null) {
            return cadMedicamentoService.getAllMedicamentos(user);
        }
        return null; // Usuário não encontrado
    }

    // Atualizar medicamento
    @PutMapping("/update")
    public String updateMedicamento(@RequestBody CadMedicamento medicamento) {
        cadMedicamentoService.updateMedicamento(medicamento);
        return "Medicamento atualizado com sucesso!";
    }

    // Excluir medicamento
    @DeleteMapping("/delete")
    public String deleteMedicamento(@RequestParam Long id) {
        cadMedicamentoService.deleteMedicamento(id);
        return "Medicamento excluído com sucesso!";
    }
}
