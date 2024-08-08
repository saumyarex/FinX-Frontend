import React, { useState, useCallback } from 'react';
import './CompoundInterestCalculator.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Button } from "react-bootstrap";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    // Clear previous error
    setError('');

    // Parse input values
    const principalAmount = parseFloat(principal);
    const interestRate = parseFloat(rate);
    const timePeriod = parseFloat(time);

    // Validate input values
    if (isNaN(principalAmount) || isNaN(interestRate) || isNaN(timePeriod)) {
      setError("Please enter valid numbers for all fields.");
      return;
    }

    const compoundFrequency = 1; // Compounded yearly
    let compoundInterest, totalInterest, allTimeRoR;
    let yearlyBreakdown = '<table border="1"><tr><th>Year</th><th>Interest</th><th>Accrued Interest</th><th>Balance</th></tr>';

    for (let year = 1; year <= timePeriod; year++) {
      compoundInterest = principalAmount * Math.pow((1 + interestRate / (100 * compoundFrequency)), (compoundFrequency * year));
      totalInterest = compoundInterest - principalAmount;
      allTimeRoR = (compoundInterest - principalAmount) / principalAmount * 100;

      yearlyBreakdown += `<tr>
        <td>${year}</td>
        <td>${totalInterest.toFixed(2)}</td>
        <td>${compoundInterest.toFixed(2)}</td>
        <td>${(compoundInterest + principalAmount * (year - 1)).toFixed(2)}</td>
      </tr>`;
    }

    yearlyBreakdown += '</table>';

    setResult({
      compoundInterest: compoundInterest.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      rate: interestRate.toFixed(2),
      allTimeRoR: allTimeRoR.toFixed(2),
      yearlyBreakdown: yearlyBreakdown
    });
  };

  const resetCalculator = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
    setError('');
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <div className='maincontainer'>
        <div className="containercal">
          <div className="calculator">
            <h1>Compound Interest Calculator</h1>
            <div className="input-group">
              <label htmlFor="principal">Principal Amount:</label>
              <input
                type="number"
                id="principal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
              />
            </div>
            <div className="input-group">
              <label htmlFor="rate">Annual Interest Rate (%):</label>
              <input
                type="number"
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="input-group">
              <label htmlFor="time">Time Period (years):</label>
              <input
                type="number"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time period"
              />
            </div>

            <Button onClick={calculate}>Calculate</Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {result && (
            <div className="result-container">
              <strong>Projection for {time} years:</strong><br />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>Values</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Future compound value:</strong></td>
                    <td>{result.compoundInterest}</td>
                  </tr>
                  <tr>
                    <td><strong>Total interest:</strong></td>
                    <td>{result.totalInterest}</td>
                  </tr>
                  <tr>
                    <td><strong>Interest rate:</strong></td>
                    <td>{result.rate}%</td>
                  </tr>
                  <tr>
                    <td><strong>All-time rate of Return (RoR):</strong></td>
                    <td>{result.allTimeRoR}%</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <strong>Yearly Breakdown:</strong><br />
              <div dangerouslySetInnerHTML={{ __html: result.yearlyBreakdown }} />
              <div className="resetbtncontainer">
                <Button onClick={resetCalculator} className="btn btn-primary mt-3">Reset</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
