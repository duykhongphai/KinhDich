import React from 'react';
import { LINE_TYPES } from '../utils/ichingUtils';

/**
 * Hiển thị cột 6 hào của quẻ theo thứ tự Chu Dịch chuẩn:
 * Hào 6 (Thượng hào) ở trên cùng -> Hào 1 (Sơ hào) ở dưới cùng.
 */
export default function HexagramColumn({
  lines = [], // Mảng các giá trị [h1, h2, h3, h4, h5, h6] (tối đa 6 hào)
  currentLineIndex = 0,
  isFinished = false,
  onLineClick,
}) {
  // Chuẩn bị 6 vị trí: index 5 (Hào 6) đến index 0 (Hào 1)
  const slots = [5, 4, 3, 2, 1, 0];

  const lineOrderNames = [
    'Sơ Hào (1)',
    'Nhị Hào (2)',
    'Tam Hào (3)',
    'Tứ Hào (4)',
    'Ngũ Hào (5)',
    'Thượng Hào (6)',
  ];

  return (
    <div className="flex flex-col w-full max-w-xs bg-stone-900/60 p-5 rounded-2xl border border-stone-800 shadow-xl backdrop-blur-sm">
      {/* Tiêu đề cột hào */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800/80 mb-3">
        <h3 className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Tiến Trình 6 Hào
        </h3>
        <span className="text-xs text-stone-400">
          {lines.length}/6 hào
        </span>
      </div>

      {/* Danh sách 6 hào hiển thị từ Thượng hào (trên) xuống Sơ hào (dưới) */}
      <div className="flex flex-col gap-3 py-1">
        {slots.map((slotIdx) => {
          const lineVal = lines[slotIdx]; // undefined nếu chưa gieo tới
          const isCast = lineVal !== undefined;
          const isCurrent = !isFinished && slotIdx === currentLineIndex;
          const lineInfo = isCast ? LINE_TYPES[lineVal] : null;

          return (
            <div
              key={slotIdx}
              onClick={() => isCast && onLineClick && onLineClick(slotIdx, lineInfo)}
              className={`relative flex items-center justify-between p-2 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-amber-950/40 border border-amber-500/60 shadow-lg'
                  : isCast
                  ? 'bg-stone-950/60 border border-stone-800/80 hover:border-amber-700/50 cursor-pointer'
                  : 'bg-stone-950/20 border border-dashed border-stone-800/50 opacity-40'
              }`}
            >
              {/* Tên vị trí hào */}
              <div className="w-24 text-[11px] font-medium tracking-wide flex items-center gap-1">
                <span className={isCurrent ? 'text-amber-300 font-bold' : isCast ? 'text-stone-300' : 'text-stone-600'}>
                  {lineOrderNames[slotIdx]}
                </span>
                {slotIdx === 4 && (
                  <span className="text-[9px] text-amber-400 bg-amber-950/80 px-1 rounded border border-amber-800/40" title="Quân vị / Ngôi vương">
                    Quân
                  </span>
                )}
              </div>

              {/* HÌNH ẢNH ĐỒ HỌA VẠCH HÀO */}
              <div className="flex-1 flex items-center justify-center px-2">
                {isCast ? (
                  // Vạch Hào đã gieo
                  <div className="w-full flex items-center justify-center">
                    {lineInfo.isYang ? (
                      // HÀO DƯƠNG: Vạch liền
                      <div className="relative w-full h-4 rounded flex items-center justify-center">
                        <div
                          className={`w-full h-2.5 rounded transition-all ${
                            lineInfo.isMoving
                              ? 'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                              : 'bg-amber-400/90'
                          }`}
                        />
                        {/* Ký hiệu Lão Dương (Dương Động) ◯ */}
                        {lineInfo.isMoving && (
                          <div className="absolute w-4 h-4 rounded-full bg-stone-950 border-2 border-amber-300 flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                          </div>
                        )}
                      </div>
                    ) : (
                      // HÀO ÂM: Vạch đứt (2 đoạn)
                      <div className="relative w-full h-4 flex items-center justify-between">
                        <div
                          className={`w-[44%] h-2.5 rounded transition-all ${
                            lineInfo.isMoving
                              ? 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                              : 'bg-stone-300/80'
                          }`}
                        />
                        {/* Ký hiệu Lão Âm (Âm Động) ✕ */}
                        {lineInfo.isMoving ? (
                          <div className="absolute left-1/2 -translate-x-1/2 text-xs font-black text-rose-300 drop-shadow">
                            ✕
                          </div>
                        ) : (
                          <div className="w-[12%]" />
                        )}
                        <div
                          className={`w-[44%] h-2.5 rounded transition-all ${
                            lineInfo.isMoving
                              ? 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                              : 'bg-stone-300/80'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ) : isCurrent ? (
                  // Hào đang chờ gieo (chớp sáng)
                  <div className="w-full h-2.5 rounded border border-dashed border-amber-400/70 animate-pulse bg-amber-500/10" />
                ) : (
                  // Hào chưa tới lượt
                  <div className="w-full h-2 rounded border border-stone-800" />
                )}
              </div>

              {/* Thông tin tên tính chất hào */}
              <div className="w-20 text-right">
                {isCast ? (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${lineInfo.badge}`}>
                    {lineInfo.label}
                  </span>
                ) : isCurrent ? (
                  <span className="text-[10px] text-amber-400 animate-pulse font-medium">
                    Đang gieo...
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-600">
                    Chờ
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chú thích phân định Thượng quái & Hạ quái */}
      <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <span className="text-amber-400 font-serif">☰</span>
          Hào 4,5,6: Thượng quái
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-400 font-serif">☷</span>
          Hào 1,2,3: Hạ quái
        </span>
      </div>
    </div>
  );
}
