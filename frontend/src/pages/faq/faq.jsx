import React, { useState, useRef } from 'react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(FAQs);

  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = FAQs.filter((faq) =>
      faq.question.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredFAQs(filtered);
  };

  const handleToggleFAQ = (index) => {
    const updatedFAQs = [...filteredFAQs];
    updatedFAQs[index].open = !updatedFAQs[index].open;
    setFilteredFAQs(updatedFAQs);
  };

  const handleCollapseAll = () => {
    const updatedFAQs = filteredFAQs.map((faq) => ({ ...faq, open: false }));
    setFilteredFAQs(updatedFAQs);
  };

  const handleExpandAll = () => {
    const updatedFAQs = filteredFAQs.map((faq) => ({ ...faq, open: true }));
    setFilteredFAQs(updatedFAQs);
  };

  const scrollToRef = (ref) => {
    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions (FAQ)</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-l px-4 py-2 w-full"
          ref={searchInputRef}
        />
        <button
          onClick={handleCollapseAll}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded-r"
        >
          Collapse All
        </button>
      </div>
      {filteredFAQs.length === 0 ? (
        <p className="text-center">No FAQs found.</p>
      ) : (
        <div>
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="mb-8">
              <h2
                className="text-xl font-bold mb-2 cursor-pointer"
                onClick={() => {
                  handleToggleFAQ(index);
                  scrollToRef(searchInputRef);
                }}
              >
                {faq.question}
              </h2>
              {faq.open && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FAQs = [
  {
    question: 'What is Lorem Ipsum?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    open: false,
  },
  {
    question: 'Why do we use it?',
    answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    open: false,
  },
  {
    question: 'Where does it come from?',
    answer: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    open: false,
  },
  {
    question: 'How many variations of passages of Lorem Ipsum are there?',
    answer: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.',
    open: false,
  },
  // Add more FAQ items as needed
];

export default FAQPage;
