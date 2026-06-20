'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConnectModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConnectModalContext = createContext<ConnectModalContextType | undefined>(undefined);

export function ConnectModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConnectModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ConnectModalContext.Provider>
  );
}

export function useConnectModal() {
  const context = useContext(ConnectModalContext);
  if (context === undefined) {
    throw new Error('useConnectModal must be used within a ConnectModalProvider');
  }
  return context;
}
