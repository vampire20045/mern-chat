import React, { useState } from 'react';

const TechNewsPage = () => {
  const [techNews, setTechNews] = useState([
    {
      id: 1,
      title: "New iPhone 14 Leaked: What We Know So Far",
      description: "Rumors suggest the iPhone 14 will feature a smaller notch and improved camera technology.",
      source: "Tech Insider",
      date: "2024-02-25"
    },
    {
      id: 2,
      title: "Google's Quantum Computer Achieves Major Breakthrough",
      description: "Google's quantum computing team has made a significant advancement in quantum error correction.",
      source: "Quantum Weekly",
      date: "2024-02-24"
    },
    {
      id: 3,
      title: "Tesla Unveils New Self-Driving Car Software Update",
      description: "Tesla's latest software update promises improved autonomous driving capabilities.",
      source: "Electric Vehicle News",
      date: "2024-02-23"
    },
    {
      id: 1,
      title: "New iPhone 14 Leaked: What We Know So Far",
      description: "Rumors suggest the iPhone 14 will feature a smaller notch and improved camera technology.",
      source: "Tech Insider",
      date: "2024-02-25"
    },
    {
      id: 2,
      title: "Google's Quantum Computer Achieves Major Breakthrough",
      description: "Google's quantum computing team has made a significant advancement in quantum error correction.",
      source: "Quantum Weekly",
      date: "2024-02-24"
    },
    {
      id: 3,
      title: "Tesla Unveils New Self-Driving Car Software Update",
      description: "Tesla's latest software update promises improved autonomous driving capabilities.",
      source: "Electric Vehicle News",
      date: "2024-02-23"
    },
    {
      id: 4,
      title: "Microsoft announces the release date of Windows 12",
      description: "The highly anticipated Windows 12 is set to release on April 1st, 2024.",
      source: "WindowsCentral",
      date: "2024-02-22"
    },
    {
      id: 5,
      title: "Amazon unveils plans for satellite internet constellation",
      description: "Amazon's Project Kuiper aims to provide high-speed internet access to underserved areas via a network of satellites.",
      source: "SpaceTech Today",
      date: "2024-02-21"
    },
    {
      id: 6,
      title: "Facebook rebrands to Meta in major corporate overhaul",
      description: "Mark Zuckerberg announces Facebook's rebranding to Meta, emphasizing the company's focus on the metaverse.",
      source: "Social Media Gazette",
      date: "2024-02-20"
    },
    {
      id: 7,
      title: "Apple to Launch AR Glasses in 2024",
      description: "Apple's long-rumored AR glasses are reportedly set for release next year, promising revolutionary augmented reality experiences.",
      source: "TechRadar",
      date: "2024-02-19"
    },
    {
      id: 8,
      title: "SpaceX Successfully Launches First Crewed Mission to Mars",
      description: "SpaceX's Starship spacecraft has completed its historic journey to Mars, marking the first crewed mission to the Red Planet.",
      source: "SpaceNews",
      date: "2024-02-18"
    },
    {
      id: 9,
      title: "Google AI Breakthrough Enables Real-Time Language Translation",
      description: "Google's latest AI model has achieved a major milestone in real-time language translation, making communication across languages seamless.",
      source: "AI Times",
      date: "2024-02-17"
    },
    {
      id: 10,
      title: "IBM Unveils Quantum Computer with 1024 Qubits",
      description: "IBM has announced the development of a quantum computer with 1024 qubits, a significant milestone in quantum computing.",
      source: "Quantum World",
      date: "2024-02-16"
    },
    {
      id: 11,
      title: "Samsung Introduces Foldable Smartphone with Flexible Glass Display",
      description: "Samsung's latest foldable smartphone features a flexible glass display, offering improved durability and performance.",
      source: "Gadget Guru",
      date: "2024-02-15"
    },
    {
      id: 12,
      title: "Uber to Launch Flying Taxi Service in Los Angeles",
      description: "Uber has announced plans to launch a flying taxi service in Los Angeles, revolutionizing urban transportation.",
      source: "Aviation Today",
      date: "2024-02-14"
    },
    {
      id: 13,
      title: "Facebook Faces Antitrust Lawsuit Over Meta Rebrand",
      description: "Facebook's rebranding to Meta has sparked an antitrust lawsuit, alleging monopolistic practices in the social media industry.",
      source: "Legal Digest",
      date: "2024-02-13"
    },
    {
      id: 14,
      title: "Sony Unveils PlayStation VR 2 with 4K Display",
      description: "Sony has revealed the next-generation PlayStation VR 2 headset, featuring a stunning 4K display and enhanced VR experiences.",
      source: "Gaming Insider",
      date: "2024-02-12"
    },
    {
      id: 15,
      title: "Apple Car Project Gains Momentum with New Partnership",
      description: "Apple's electric car project has gained momentum with a new partnership, signaling the tech giant's entry into the automotive industry.",
      source: "Automotive News",
      date: "2024-02-11"
    },
    {
      id: 16,
      title: "NASA Discovers Potentially Habitable Exoplanet",
      description: "NASA's Kepler Space Telescope has discovered a potentially habitable exoplanet in a distant star system, raising hopes for extraterrestrial life.",
      source: "Space Exploration Journal",
      date: "2024-02-10"
    },
    {
      id: 17,
      title: "Intel Unveils Breakthrough Chip Architecture for AI Applications",
      description: "Intel has unveiled a breakthrough chip architecture optimized for AI applications, promising unprecedented performance and efficiency.",
      source: "AI Chip News",
      date: "2024-02-09"
    },
    {
      id: 18,
      title: "Microsoft Acquires Virtual Reality Startup for $2 Billion",
      description: "Microsoft has acquired a leading virtual reality startup for $2 billion, signaling the company's commitment to the metaverse.",
      source: "VR World",
      date: "2024-02-08"
    },
    {
      id: 19,
      title: "Tesla Announces Plans for Gigafactory on Mars",
      description: "Elon Musk has announced Tesla's plans to build a gigafactory on Mars, leveraging the Red Planet's abundant resources for sustainable energy production.",
      source: "SpaceX News",}

    // Add more news articles here
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newSource, setNewSource] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(3);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = techNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Sorting by Date
  const sortByDate = () => {
    const sortedNews = [...techNews].sort((a, b) => new Date(b.date) - new Date(a.date));
    setTechNews(sortedNews);
  };

  // Filtering by Source
  const filterBySource = (source) => {
    const filteredNews = techNews.filter(news => news.source === source);
    setTechNews(filteredNews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      source: newSource,
      date: new Date().toISOString().split('T')[0]
    };
    setTechNews([...techNews, newArticle]);
    setNewTitle('');
    setNewDescription('');
    setNewSource('');
  };

  const handleDelete = (id) => {
    setTechNews(techNews.filter(news => news.id !== id));
  };

  return (
    <div className="container mx-auto p-4 mt-[600px]">
      <h1 className="text-3xl font-bold mb-4">Tech News</h1>
      <div className="news-controls">
        <button onClick={sortByDate} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">Sort by Date</button>
        <select onChange={(e) => filterBySource(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Filter by Source</option>
          <option value="Tech Insider">Tech Insider</option>
          <option value="Quantum Weekly">Quantum Weekly</option>
          <option value="Electric Vehicle News">Electric Vehicle News</option>
          {/* Add more options for other sources */}
        </select>
      </div>
      <ul className="space-y-4">
        {currentNews.map(news => (
          <li key={news.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
            <p className="text-gray-700 mb-2">{news.description}</p>
            <p className="text-gray-600 mb-1">Source: {news.source}</p>
            <p className="text-gray-600">Date: {news.date}</p>
            <button onClick={() => handleDelete(news.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Add New Article</h2>
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <textarea placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full p-2 mb-2 border rounded"></textarea>
        <input type="text" placeholder="Source" value={newSource} onChange={(e) => setNewSource(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Article</button>
      </form>
      <div className="pagination mt-6">
        {Array.from({ length: Math.ceil(techNews.length / newsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className="border rounded px-3 py-1 mx-1">{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default TechNewsPage;
