package com.klef.soa.exam.repository;

import com.klef.soa.exam.entity.MobileApp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MobileAppRepository extends JpaRepository<MobileApp, Long> {
}
