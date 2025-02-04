import axios from "axios";
import { newsInfo } from "../models/newsModel";

const API = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true,
});

export const getNews = async () => {
  try {
    const response = await API.post("/", {
      query: "query {getPosts {id title content author createdAt}}",
    });
    const data = (response.data as { data: { getPosts: newsInfo[] } }).data
      .getPosts;
    return data; // Asegúrate de devolver un array vacío si no hay datos
  } catch (error) {
    console.log("Failed to fetch news:", error);
    return [
      {
        id: "1",
        title: "Error",
        content: "Failed to fetch news",
        author: "string",
        createdAt: "",
        
      }
    ];
  }
};

export const getNewsById = async (newsId: string) => {
  try {
    const response = await API.post("/", {
      query: `query {getPost(id: "${newsId}") {id title content author createdAt}}`,
    });
    // console.log(response);
    const data = (response.data as { data: { getPost: newsInfo } }).data
      .getPost;
    return data; // Asegúrate de devolver un array vacío si no hay datos
  } catch (error) {
    console.log("Failed to fetch news:", error);
    return {
        id: "1",
        title: "Error",
        content: "Failed to fetch news",
        author: "string",
        createdAt: "",
    };
  }
};

export const createNews = async (newNews: newsInfo) => {
  try {
    const response = await API.post("/", {
      query: `mutation {createPost(title: "${newNews.title}", content: "${newNews.content}", author: "${newNews.author}") { id title content author createdAt }}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch news:", error);
  }
};

export const updateNews = async (newNews: newsInfo) => {
  try {
    const response = await API.post("/", {
      query: `mutation { updatePost(id: "${newNews.id}", title: "${newNews.title}", content: "${newNews.content}") { id title content author createdAt }}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch news:", error);
  }
};

export const deleteNews = async (newsId: string) => {
  try {
    const response = await API.post("/", {
      query: `mutation {deletePost(id: "${newsId}")}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch news:", error);
  }
};

