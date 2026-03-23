import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  onApply: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
}

export function DateRangePicker({ onApply, onClose }: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Empezar nueva selección
      setSelectedStart(clickedDate);
      setSelectedEnd(null);
    } else {
      // Completar rango
      if (clickedDate < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(clickedDate);
      } else {
        setSelectedEnd(clickedDate);
      }
    }
  };

  const isDateInRange = (day: number) => {
    if (!selectedStart) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Si hay un hover y no hay end seleccionado, mostrar el rango temporal
    if (!selectedEnd && hoveredDate && hoveredDate > selectedStart) {
      return date >= selectedStart && date <= hoveredDate;
    }
    
    if (selectedEnd) {
      return date > selectedStart && date < selectedEnd;
    }
    return false;
  };

  const isStartDate = (day: number) => {
    if (!selectedStart) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.getTime() === selectedStart.getTime();
  };

  const isEndDate = (day: number) => {
    if (!selectedEnd) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.getTime() === selectedEnd.getTime();
  };

  const handleDayHover = (day: number | null) => {
    if (day === null) {
      setHoveredDate(null);
      return;
    }
    if (selectedStart && !selectedEnd) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setHoveredDate(date);
    }
  };

  const handleQuickSelect = (type: 'last7' | 'last30' | 'thisMonth' | 'lastMonth') => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let start: Date;
    let end: Date = new Date(today);

    switch (type) {
      case 'last7':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
      case 'last30':
        start = new Date(today);
        start.setDate(today.getDate() - 30);
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        return;
    }

    setSelectedStart(start);
    setSelectedEnd(end);
  };

  const handleClear = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
    setHoveredDate(null);
  };

  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      onApply(selectedStart, selectedEnd);
      onClose();
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDateRange = () => {
    if (!selectedStart) return '';
    if (!selectedEnd) return `${selectedStart.getDate()}/${selectedStart.getMonth() + 1}/${selectedStart.getFullYear()}`;
    
    return `${selectedStart.getDate()}/${selectedStart.getMonth() + 1}/${selectedStart.getFullYear()} - ${selectedEnd.getDate()}/${selectedEnd.getMonth() + 1}/${selectedEnd.getFullYear()}`;
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/50 overflow-hidden" 
         style={{ fontFamily: "'Nunito', sans-serif", maxWidth: '500px' }}>
      
      {/* Header con rango seleccionado */}
      {formatDateRange() && (
        <div className="bg-gradient-to-br from-[#F5F8FB] to-white p-5 border-b border-slate-200/50">
          <div className="text-base font-bold text-slate-900">
            {formatDateRange()}
          </div>
        </div>
      )}

      {/* Atajos rápidos */}
      <div className="grid grid-cols-2 gap-2 p-4 bg-[#F5F8FB]/30">
        {[
          { label: 'Últimos 7 días', value: 'last7' as const },
          { label: 'Últimos 30 días', value: 'last30' as const },
          { label: 'Este mes', value: 'thisMonth' as const },
          { label: 'Mes anterior', value: 'lastMonth' as const }
        ].map((shortcut) => (
          <button
            key={shortcut.value}
            onClick={() => handleQuickSelect(shortcut.value)}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#FF8000] hover:text-white text-slate-700 font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200/50 hover:border-[#FF8000]"
          >
            {shortcut.label}
          </button>
        ))}
      </div>

      {/* Calendario */}
      <div className="p-5 bg-white">
        {/* Header del mes */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={prevMonth} 
            className="p-2.5 hover:bg-[#F5F8FB] rounded-full transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          <h3 className="font-bold text-slate-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          
          <button 
            onClick={nextMonth} 
            className="p-2.5 hover:bg-[#F5F8FB] rounded-full transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {dayNames.map((day, idx) => (
            <div 
              key={idx} 
              className="text-center text-xs font-bold text-slate-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const inRange = isDateInRange(day);
            const isStart = isStartDate(day);
            const isEnd = isEndDate(day);
            const isEdge = isStart || isEnd;

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                onMouseEnter={() => handleDayHover(day)}
                onMouseLeave={() => handleDayHover(null)}
                className={`
                  aspect-square flex items-center justify-center text-sm font-semibold transition-all duration-200 relative
                  ${isEdge
                    ? 'bg-[#FF8000] text-white shadow-md rounded-full z-10 scale-105'
                    : inRange
                    ? 'bg-[#FF8000]/10 text-[#FF8000] rounded-lg'
                    : 'text-slate-700 hover:bg-[#F5F8FB] rounded-lg'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3 p-4 bg-[#F5F8FB]/30 border-t border-slate-200/50">
        <button
          onClick={handleClear}
          className="flex-1 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
        >
          Limpiar
        </button>
        <button
          onClick={handleApply}
          disabled={!selectedStart || !selectedEnd}
          className={`
            flex-1 px-5 py-3 rounded-full font-bold transition-all duration-200 shadow-sm
            ${selectedStart && selectedEnd
              ? 'bg-[#FF8000] text-white hover:bg-[#FF8000]/90 hover:shadow-md'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}