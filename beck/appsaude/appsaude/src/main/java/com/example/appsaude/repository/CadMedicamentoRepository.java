package com.example.appsaude.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.appsaude.model.CadMedicamento;
import com.example.appsaude.model.User;

public interface CadMedicamentoRepository extends JpaRepository<CadMedicamento, Long> {
    List<CadMedicamento> findByUser(User user);
}
