package com.example.demo.repository;

import com.example.demo.model.BlogPost;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    @Query("SELECT b FROM BlogPost b ORDER BY b.date DESC")
    List<BlogPost> findAllOrderByDateDesc();
}
