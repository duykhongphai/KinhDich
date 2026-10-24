import { TRIGRAMS, BINARY_TO_TRIGRAM } from '../data/trigrams';
import { HEXAGRAMS, HEXAGRAM_MAP } from '../data/hexagrams';

/**
 * Quy ước gieo 3 đồng xu cổ Chu Dịch:
 * - Mặt Dương (Mặt Chữ "Càn Long Thông Bảo"): 3 điểm
 * - Mặt Âm (Mặt Họa Tiết / Lưng đồng xu): 2 điểm
 *
 * Tổng điểm của 3 đồng xu:
 * - 6 điểm (2+2+2): Lão Âm (Âm động -> Biến thành Dương ở Quẻ Biến)
 * - 7 điểm (3+2+2): Thiếu Dương (Dương tĩnh)
 * - 8 điểm (3+3+2): Thiếu Âm (Âm tĩnh)
 * - 9 điểm (3+3+3): Lão Dương (Dương động -> Biến thành Âm ở Quẻ Biến)
 */

export const LINE_TYPES = {
  6: {
    value: 6,
    name: 'Lão Âm',
    hanzi: '老陰',
    isYang: false,
    isMoving: true,
    symbol: '⚏',
    label: 'Âm Động',
    changedYang: true,
    code: 'x',
    color: 'text-rose-400',
    borderColor: 'border-rose-500',
    bg: 'bg-rose-950/40',
    badge: 'bg-rose-900/60 text-rose-300 border-rose-700/50',
    description: 'Âm cực thịnh sinh Dương, hào phát động biến đổi',
  },
  7: {
    value: 7,
    name: 'Thiếu Dương',
    hanzi: '少陽',
    isYang: true,
    isMoving: false,
    symbol: '⚊',
    label: 'Dương Tĩnh',
    changedYang: true,
    code: '1',
    color: 'text-amber-300',
    borderColor: 'border-amber-400',
    bg: 'bg-amber-950/30',
    badge: 'bg-amber-900/50 text-amber-200 border-amber-700/40',
    description: 'Dương khí ổn định, vững vàng',
  },
  8: {
    value: 8,
    name: 'Thiếu Âm',
    hanzi: '少陰',
    isYang: false,
    isMoving: false,
    symbol: '⚋',
    label: 'Âm Tĩnh',
    changedYang: false,
    code: '0',
    color: 'text-stone-300',
    borderColor: 'border-stone-500',
    bg: 'bg-stone-900/40',
    badge: 'bg-stone-800 text-stone-300 border-stone-600/40',
    description: 'Âm khí nhu thuận, ổn định',
  },
  9: {
    value: 9,
    name: 'Lão Dương',
    hanzi: '老陽',
    isYang: true,
    isMoving: true,
    symbol: '⚌',
    label: 'Dương Động',
    changedYang: false,
    code: 'o',
    color: 'text-amber-400',
    borderColor: 'border-amber-400',
    bg: 'bg-amber-950/50',
    badge: 'bg-amber-800/80 text-amber-100 border-amber-500/60',
    description: 'Dương cực thịnh sinh Âm, hào phát động biến đổi',
  },
};

// Tung 3 đồng xu ngẫu nhiên
export function tossThreeCoins() {
  // Mỗi đồng xu: 3 (Dương - Mặt Chữ) hoặc 2 (Âm - Mặt Hoa Văn)
  const coins = [
    Math.random() < 0.5 ? 2 : 3,
    Math.random() < 0.5 ? 2 : 3,
    Math.random() < 0.5 ? 2 : 3,
  ];

  const sum = coins.reduce((acc, cur) => acc + cur, 0);
  const lineInfo = LINE_TYPES[sum];

  return {
    coins, // mảng 3 giá trị 2 hoặc 3
    sum,   // 6, 7, 8, hoặc 9
    lineInfo,
  };
}

// Tìm quẻ đơn từ 3 hào [h1, h2, h3] (0 hoặc 1)
export function getTrigramFromLines(binary3) {
  const key = binary3.join(',');
  return BINARY_TO_TRIGRAM[key] || TRIGRAMS.KHON;
}

// Tìm quẻ kép (Hexagram) từ 6 hào gốc
export function getHexagramFromLines(lines) {
  // lines: mảng 6 phần tử giá trị 6, 7, 8, 9
  // Hào 1, 2, 3: Hạ quái
  // Hào 4, 5, 6: Thượng quái
  const binaryOriginal = lines.map(val => (val === 7 || val === 9 ? 1 : 0));

  const lowerTrigram = getTrigramFromLines(binaryOriginal.slice(0, 3));
  const upperTrigram = getTrigramFromLines(binaryOriginal.slice(3, 6));

  const hexKey = `${upperTrigram.id}_${lowerTrigram.id}`;
  const hexagram = HEXAGRAM_MAP[hexKey] || HEXAGRAMS[0];

  return {
    hexagram,
    upperTrigram,
    lowerTrigram,
    binary: binaryOriginal,
  };
}

// Tính Quẻ Biến (khi có hào động 6 hoặc 9 biến đổi)
export function getTransformedHexagram(lines) {
  const movingLineIndices = [];

  const binaryTransformed = lines.map((val, idx) => {
    if (val === 6) {
      movingLineIndices.push(idx);
      return 1; // 6 (Lão Âm) biến thành Dương (1)
    }
    if (val === 9) {
      movingLineIndices.push(idx);
      return 0; // 9 (Lão Dương) biến thành Âm (0)
    }
    return val === 7 ? 1 : 0;
  });

  // Nếu không có hào động nào
  if (movingLineIndices.length === 0) {
    return {
      hasMovingLines: false,
      hexagram: null,
      movingLineIndices: [],
      upperTrigram: null,
      lowerTrigram: null,
      binary: binaryTransformed,
    };
  }

  const lowerTrigram = getTrigramFromLines(binaryTransformed.slice(0, 3));
  const upperTrigram = getTrigramFromLines(binaryTransformed.slice(3, 6));

  const hexKey = `${upperTrigram.id}_${lowerTrigram.id}`;
  const hexagram = HEXAGRAM_MAP[hexKey] || HEXAGRAMS[0];

  return {
    hasMovingLines: true,
    hexagram,
    movingLineIndices,
    upperTrigram,
    lowerTrigram,
    binary: binaryTransformed,
  };
}

// Tính Quẻ Hỗ (Nuclear Hexagram):
// Hạ quái lấy hào 2, 3, 4; Thượng quái lấy hào 3, 4, 5 của quẻ chủ
export function getNuclearHexagram(lines) {
  const binaryOriginal = lines.map(val => (val === 7 || val === 9 ? 1 : 0));

  // Hào 2, 3, 4 (index 1, 2, 3) -> Hạ quái quẻ Hỗ
  const lowerLines = [binaryOriginal[1], binaryOriginal[2], binaryOriginal[3]];
  // Hào 3, 4, 5 (index 2, 3, 4) -> Thượng quái quẻ Hỗ
  const upperLines = [binaryOriginal[2], binaryOriginal[3], binaryOriginal[4]];

  const lowerTrigram = getTrigramFromLines(lowerLines);
  const upperTrigram = getTrigramFromLines(upperLines);

  const hexKey = `${upperTrigram.id}_${lowerTrigram.id}`;
  const hexagram = HEXAGRAM_MAP[hexKey] || HEXAGRAMS[0];

  return {
    hexagram,
    upperTrigram,
    lowerTrigram,
    binary: [...lowerLines, ...upperLines],
  };
}

// Tính Can Chi ngày giờ chiêm bói theo thuật cổ
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export function getCurrentCanChiTime(date = new Date()) {
  const year = date.getFullYear();
  const canYear = CAN[(year + 6) % 10];
  const chiYear = CHI[(year + 8) % 12];

  // Tính Can Chi Giờ ước lượng
  const hour = date.getHours();
  const chiHourIdx = Math.floor((hour + 1) % 24 / 2);
  const chiHour = CHI[chiHourIdx];

  const formattedDate = date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    yearCanChi: `${canYear} ${chiYear}`,
    hourChi: `Giờ ${chiHour}`,
    formattedDate,
    formattedTime,
  };
}

// Tên vị trí 6 hào truyền thống
export const LINE_NAMES = [
  'Sơ Hào (Hào 1)',
  'Nhị Hào (Hào 2)',
  'Tam Hào (Hào 3)',
  'Tứ Hào (Hào 4)',
  'Ngũ Hào (Hào 5 - Quân Vị)',
  'Thượng Hào (Hào 6)',
];
