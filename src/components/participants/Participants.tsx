import React, { useEffect, useState } from 'react';

import { CarLoader } from '../carLoader/CarLoader';

import './Participants.css';

const Participants = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchParticipantsHandler();
  }, []);

  const fetchParticipantsHandler = async () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <div className="participants">
      <header>
        <h2>Participants</h2>
      </header>
      <div className="content">
        {!isLoading && <p>Participants list</p>}
        {isLoading && <CarLoader />}
      </div>
    </div>
  );
};
export default Participants;
