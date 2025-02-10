import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { useState } from 'react'
import './App.css'
import { apiService } from './lib/api'

// Utility function to detect iPhone
const isIPhone = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('iphone');
};

interface HealthResponse {
  status: string;
  message: string;
  checks: number;
}

const queryClient = new QueryClient(); // Move outside component to prevent recreation

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [checkCount, setCheckCount] = useState<number>(0)
  const [lastResponse, setLastResponse] = useState<string>('')
  const [isIPhoneDevice] = useState(isIPhone());

  // const testBackendConnection = async () => {
  //   try {
  //     console.log('Testing connection...');
  //     const response = await apiService.testConnection() as HealthResponse;
  //     console.log('Connection response:', response);
      
  //     setLastResponse(JSON.stringify(response, null, 2));
      
  //     if (typeof response.checks === 'number') {
  //       console.log('Setting check count to:', response.checks);
  //       setCheckCount(response.checks);
  //       setConnectionStatus(`Connected! ${response.message}`);
  //     } else {
  //       console.warn('Check count is not a number:', response.checks);
  //       setConnectionStatus(`Connected! ${response.message}`);
  //     }
  //   } catch (error) {
  //     console.error('Connection error:', error);
  //     setConnectionStatus('Connection failed. Check console for details.')
  //     setLastResponse(error instanceof Error ? error.message : 'Unknown error');
  //   }
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="">
          <div className={""}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;