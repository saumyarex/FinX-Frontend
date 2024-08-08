import React, { useState, useCallback } from "react";
import "./TaxCalculator.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Button } from "react-bootstrap";

const TaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [ltcg, setLtcg] = useState("0");
  const [stcg, setStcg] = useState("0");
  const [deductions, setDeductions] = useState("0");
  const [exemptions, setExemptions] = useState("0");
  const [taxDetails, setTaxDetails] = useState(null);
  const [taxRegime, setTaxRegime] = useState("new");

  const NEW_TAX_SLABS = [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.1 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  const OLD_TAX_SLABS = [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  let STANDARD_DEDUCTION = 75000;
  const LTCG_EXEMPTION_LIMIT = 125000;
  const CESS_RATE = 0.04;

  if (taxRegime === "new") {
    STANDARD_DEDUCTION = 75000;
  } else {
    STANDARD_DEDUCTION = 50000;
  }

  const calculateSurcharge = (income, regime) => {
    if (regime === "new") {
      if (income > 20000000) return 0.25;
      if (income > 10000000) return 0.15;
      if (income > 5000000) return 0.1;
    } else {
      if (income > 50000000) return 0.37;
      if (income > 20000000) return 0.25;
      if (income > 10000000) return 0.15;
      if (income > 5000000) return 0.1;
    }
    return 0;
  };

  const calculateTax = () => {
    const incomeAmount = parseFloat(income);
    const ltcgAmount = parseFloat(ltcg);
    const stcgAmount = parseFloat(stcg);
    const deductionsAmount = parseFloat(deductions) || 0;
    const exemptionsAmount = parseFloat(exemptions) || 0;

    const taxableIncome = Math.max(
      0,
      incomeAmount - STANDARD_DEDUCTION - deductionsAmount - exemptionsAmount
    );
    const taxableLTCG = Math.max(0, ltcgAmount - LTCG_EXEMPTION_LIMIT);

    const taxSlabs = taxRegime === "new" ? NEW_TAX_SLABS : OLD_TAX_SLABS;

    let tax = 0;
    let prevLimit = 0;

    for (const slab of taxSlabs) {
      if (taxableIncome > slab.limit) {
        tax += (slab.limit - prevLimit) * slab.rate;
        prevLimit = slab.limit;
      } else {
        tax += (taxableIncome - prevLimit) * slab.rate;
        break;
      }
    }

    const ltcgTax = taxableLTCG * 0.2;
    const stcgTax = stcgAmount * 0.15;
    const totalTaxBeforeCessSurcharge = tax + ltcgTax + stcgTax;

    const surcharge =
      totalTaxBeforeCessSurcharge * calculateSurcharge(incomeAmount, taxRegime);

    const cess = (totalTaxBeforeCessSurcharge + surcharge) * CESS_RATE;

    const totalTax = totalTaxBeforeCessSurcharge + surcharge + cess;

    setTaxDetails({
      incomeTax: tax.toFixed(2),
      ltcgTax: ltcgTax.toFixed(2),
      stcgTax: stcgTax.toFixed(2),
      surcharge: surcharge.toFixed(2),
      cess: cess.toFixed(2),
      totalTax: totalTax.toFixed(2),
    });
  };

  const resetCalculator = () => {
    setIncome("");
    setLtcg("");
    setStcg("");
    setDeductions("");
    setExemptions("");
    setTaxDetails(null);
    setTaxRegime("new");
  };

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

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
      <div className="maincontainer">
        <div className="containercal">
          <h1>Tax Calculator</h1>
          <div className="button-group">
            <Button
              onClick={() => setTaxRegime("new")}
              className={taxRegime === "new" ? "active" : ""}
            >
              New Tax Regime
            </Button>
            <Button
              onClick={() => setTaxRegime("old")}
              className={taxRegime === "old" ? "active" : ""}
            >
              Old Tax Regime
            </Button>
          </div>
          <div className="input-group">
            <label htmlFor="income">Annual Income:</label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter annual income"
            />
            <small>Standard Deduction: ₹{STANDARD_DEDUCTION}</small>
          </div>
          <div className="input-group">
            <label htmlFor="deductions">Deductions:</label>
            <input
              type="number"
              id="deductions"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="Enter deductions"
            />
          </div>
          <div className="input-group">
            <label htmlFor="ltcg">Long-Term Capital Gains (LTCG):</label>
            <input
              type="number"
              id="ltcg"
              value={ltcg}
              onChange={(e) => setLtcg(e.target.value)}
              placeholder="Enter LTCG"
            />
            <small>LTCG Exemption Limit: ₹{LTCG_EXEMPTION_LIMIT}</small>
          </div>
          <div className="input-group">
            <label htmlFor="stcg">Short-Term Capital Gains (STCG):</label>
            <input
              type="number"
              id="stcg"
              value={stcg}
              onChange={(e) => setStcg(e.target.value)}
              placeholder="Enter STCG"
            />
          </div>
          <div className="input-group">
            <label htmlFor="exemptions">Exemptions:</label>
            <input
              type="number"
              id="exemptions"
              value={exemptions}
              onChange={(e) => setExemptions(e.target.value)}
              placeholder="Enter exemptions"
            />
          </div>

          <Button onClick={calculateTax}>Calculate</Button>

          {taxDetails && (
            <div className="result-container">
              <strong>Income Tax Details:</strong>
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Income Tax:</strong>
                    </td>
                    <td>₹{taxDetails.incomeTax}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>LTCG Tax:</strong>
                    </td>
                    <td>₹{taxDetails.ltcgTax}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>STCG Tax:</strong>
                    </td>
                    <td>₹{taxDetails.stcgTax}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Surcharge:</strong>
                    </td>
                    <td>₹{taxDetails.surcharge}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Health & Education Cess:</strong>
                    </td>
                    <td>₹{taxDetails.cess}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Tax:</strong>
                    </td>
                    <td>₹{taxDetails.totalTax}</td>
                  </tr>
                </tbody>
              </table>
              <div className="resetbtncontainer">
                <Button onClick={resetCalculator} className="resetbtn">
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
