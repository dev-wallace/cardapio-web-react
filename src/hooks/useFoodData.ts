import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';

// URL base da API
const API_URL = 'http://localhost:8080';

// Função para buscar dados do endpoint /food
const fetchData = async (): AxiosPromise<FoodData[]> => {
    // Faz uma requisição GET para o endpoint /food
    const response = axios.get(API_URL + '/food');
    // Retorna a promessa com a resposta da API
    return response;
}

// Hook personalizado para buscar e gerenciar dados de alimentos
export function useFoodData() {
    // Usando o hook useQuery do react-query para buscar dados
    const query = useQuery({
        queryFn: fetchData,    // Função que faz a requisição de dados
        queryKey: ['food-data'], // Chave para identificar e armazenar os dados no cache
        retry: 2  // Número de tentativas automáticas em caso de falha
    });

    // Retorna todos os valores da consulta, além de extrair os dados da resposta
    return {
        ...query,    // Inclui todos os valores padrão da consulta (como status, erro, etc.)
        data: query.data?.data  // Extrai diretamente os dados da resposta da API
    };
}
