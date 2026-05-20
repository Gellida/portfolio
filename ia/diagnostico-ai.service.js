const { analyzePatientWithClaude } = require('./claude.service');

async function analyzePatient(patient) {
  return analyzePatientWithClaude(patient);
}

module.exports = { analyzePatient };
