const {
  findPublicaciones,
  findPublicacionesStats,
  findPublicacionById,
  findInstituciones,
  findTopInstitucionesByYear,
} = require('../repositories/publicaciones.repository');
const { badRequestError, notFoundError } = require('../utils/http-errors');

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function assertIntegerInRange(rawValue, field, { min, max, required = false, fallback = null }) {
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    if (required) {
      throw badRequestError({
        publicMessage: 'Parametros de consulta invalidos.',
        internalMessage: `Falta query param requerido: ${field}`,
      });
    }
    return fallback;
  }

  const parsed = parseInteger(rawValue, null);
  if (parsed === null || String(parsed) !== String(rawValue).trim()) {
    throw badRequestError({
      publicMessage: 'Parametros de consulta invalidos.',
      internalMessage: `Query param no es entero: ${field}=${rawValue}`,
    });
  }

  if (parsed < min || parsed > max) {
    throw badRequestError({
      publicMessage: 'Parametros de consulta invalidos.',
      internalMessage: `Query param fuera de rango: ${field}=${parsed}, rango=${min}-${max}`,
    });
  }

  return parsed;
}

function getPublicaciones(query) {
  const currentYear = new Date().getFullYear() + 1;
  const year = assertIntegerInRange(query.year, 'year', {
    min: 1900,
    max: currentYear,
    fallback: null,
  });
  const limit = assertIntegerInRange(query.limit, 'limit', {
    min: 1,
    max: 200,
    fallback: 20,
  });
  const offset = assertIntegerInRange(query.offset, 'offset', {
    min: 0,
    max: 1000000,
    fallback: 0,
  });

  return findPublicaciones({ year, limit, offset });
}

function getPublicacionesStats() {
  return findPublicacionesStats();
}

function getPublicacionById(publicationId) {
  const row = findPublicacionById(publicationId);

  if (!row) {
    throw notFoundError({
      publicMessage: 'Publicacion no encontrada.',
      internalMessage: `publication_id no existe: ${publicationId}`,
    });
  }

  return row;
}

function getInstituciones(query) {
  const currentYear = new Date().getFullYear() + 1;
  const year = assertIntegerInRange(query.year, 'year', {
    min: 1900,
    max: currentYear,
    fallback: null,
  });
  const limit = assertIntegerInRange(query.limit, 'limit', {
    min: 1,
    max: 500,
    fallback: 50,
  });

  return findInstituciones({ year, limit });
}

function getTopInstituciones(query) {
  const currentYear = new Date().getFullYear() + 1;
  const year = assertIntegerInRange(query.year, 'year', {
    min: 1900,
    max: currentYear,
    fallback: 2023,
  });
  return findTopInstitucionesByYear({ year });
}

module.exports = {
  getPublicaciones,
  getPublicacionesStats,
  getPublicacionById,
  getInstituciones,
  getTopInstituciones,
};
