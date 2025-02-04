import React from 'react';
import { newsInfo } from "@/logic/models/newsModel";

interface SingleNewProps {
  newsItem: newsInfo;
}

const SingleNew: React.FC<SingleNewProps> = ({ newsItem }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-primaryColor mb-4">{newsItem.title}</h1>
      <p className="text-gray-700 mb-4">{newsItem.content}</p>
      <p className="text-gray-500 text-sm">Autor: {newsItem.author}</p>
      <p className="text-gray-500 text-sm">Fecha: {newsItem.createdAt ? new Date(newsItem.createdAt).toLocaleDateString() : 'Fecha no disponible'}</p>
    </div>
  );
};

export default SingleNew;