import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Target, Trophy, TrendingUp, Search, Calendar, ChevronDown, Zap, Sparkles, Check, Star } from 'lucide-react';
import coinIcon from 'figma:asset/db29ff4dc98462b3539ca31d029b8918fad5d4e6.png';
import logoDesafioSawa from 'figma:asset/90d0b6e7e40ee202a8c067619d31d9c79731c384.png';
import logoJohnDeere from 'figma:asset/e2e59bf2e8f60846dc4bfa3afe19d88880da27d6.png';
import { useState, useRef } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { ChallengeBanner, ColorPalette } from './ChallengeBanner';

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'finished';
  progress: number;
  target: number;
  category: string;
  icon: 'trending' | 'trophy' | 'target' | 'zap';
  unit: string;
  isMonetary?: boolean;
  imageUrl?: string;
  iconifyIcon?: string;
  imageType?: 'banner' | 'icon';
  colorPalette?: ColorPalette;
  isFeatured?: boolean;
  thresholds: {
    subcumplimiento: number;
    cumplimiento: number;
    sobrecumplimiento: number;
  };
  bonusPoints: number;
}

export function Challenges() {
  const navigate = useNavigate();
  const userPoints = 15000;
  
  const [filterStatus, setFilterStatus] = useState<'active' | 'finished' | 'all'>('active');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState<string | null>(null);
  const [dateRangeEnd, setDateRangeEnd] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Mock de desafíos
  const mockChallenges: Challenge[] = [
    {
      id: 4,
      title: 'Desafío de servicio',
      description: 'Completa todos los módulos de capacitación',
      points: 4000,
      bonusPoints: 2000,
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      status: 'finished',
      progress: 100,
      target: 100,
      category: 'Desarrollo',
      icon: 'target',
      unit: '%',
      iconifyIcon: 'mdi:headset',
      imageType: 'banner',
      colorPalette: 'purple',
      thresholds: { subcumplimiento: 60, cumplimiento: 100, sobrecumplimiento: 150 }
    },
    {
      id: 1,
      title: 'Desafío de pólizas',
      description: 'Alcanza la meta de ventas del mes',
      points: 5000,
      bonusPoints: 2500,
      startDate: '2026-02-01',
      endDate: '2026-03-15',
      status: 'active',
      progress: 3100000,
      target: 2000000,
      category: 'Ventas',
      icon: 'trending',
      unit: 'ventas',
      isMonetary: true,
      isFeatured: true,
      iconifyIcon: 'mdi:folder',
      imageType: 'banner',
      colorPalette: 'blue',
      thresholds: { subcumplimiento: 60, cumplimiento: 100, sobrecumplimiento: 150 }
    },
    {
      id: 3,
      title: 'Desafío John Deere',
      description: 'Cierra más deals que nunca',
      points: 8000,
      bonusPoints: 4000,
      startDate: '2026-02-01',
      endDate: '2026-03-30',
      status: 'active',
      progress: 35,
      target: 100,
      category: 'Ventas',
      icon: 'trophy',
      imageUrl: logoJohnDeere,
      imageType: 'banner',
      colorPalette: 'green',
      unit: 'deals',
      thresholds: { subcumplimiento: 60, cumplimiento: 100, sobrecumplimiento: 150 }
    },
    {
      id: 5,
      title: 'Desafío de clientes',
      description: 'Realiza llamadas de seguimiento a clientes',
      points: 2500,
      bonusPoints: 1250,
      startDate: '2026-02-15',
      endDate: '2026-03-05',
      status: 'active',
      progress: 75,
      target: 100,
      category: 'Atención al cliente',
      icon: 'zap',
      unit: 'llamadas',
      iconifyIcon: 'mdi:handshake',
      imageType: 'banner',
      colorPalette: 'pink',
      thresholds: { subcumplimiento: 60, cumplimiento: 100, sobrecumplimiento: 150 }
    },
    {
      id: 2,
      title: 'Desafío de repuestos',
      description: 'Completa todas tus tareas semanales',
      points: 3000,
      bonusPoints: 1500,
      startDate: '2026-02-20',
      endDate: '2026-03-01',
      status: 'active',
      progress: 52,
      target: 50,
      category: 'Productividad',
      icon: 'trending',
      unit: 'repuestos',
      iconifyIcon: 'mdi:cog',
      imageType: 'banner',
      colorPalette: 'orange',
      thresholds: { subcumplimiento: 60, cumplimiento: 100, sobrecumplimiento: 150 }
    }
  ];

  // Calcular días restantes
  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filtros
  const filteredChallenges = mockChallenges.filter((challenge) => {
    if (filterStatus !== 'all' && challenge.status !== filterStatus) return false;
    if (searchKeyword && !challenge.title.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
    if (dateRangeStart && dateRangeEnd) {
      const startDate = new Date(dateRangeStart);
      const endDate = new Date(dateRangeEnd);
      const challengeStartDate = new Date(challenge.startDate);
      const challengeEndDate = new Date(challenge.endDate);
      if (challengeEndDate < startDate || challengeStartDate > endDate) return false;
    }
    return true;
  }).sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    if (a.status === 'finished' && b.status !== 'finished') return 1;
    if (a.status !== 'finished' && b.status === 'finished') return -1;
    const daysA = getDaysRemaining(a.endDate);
    const daysB = getDaysRemaining(b.endDate);
    return daysA - daysB;
  });

  // Función helper para obtener íconos
  const getChallengeIcon = (iconName: Challenge['icon']) => {
    const iconClass = "w-6 h-6 text-[#FF8000]";
    switch (iconName) {
      case 'trending': return <TrendingUp className={iconClass} />;
      case 'trophy': return <Trophy className={iconClass} />;
      case 'target': return <Target className={iconClass} />;
      case 'zap': return <Zap className={iconClass} />;
      default: return <TrendingUp className={iconClass} />;
    }
  };

  // Estilo según días restantes
  const getDaysRemainingStyle = (days: number) => {
    if (days <= 3) {
      return { bg: 'bg-red-100', text: 'text-red-700', label: `Faltan ${days} días` };
    } else if (days <= 7) {
      return { bg: 'bg-amber-100', text: 'text-amber-700', label: `Faltan ${days} días` };
    } else {
      return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: `Faltan ${days} días` };
    }
  };

  // Calcular porcentaje de progreso
  const calculateProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 200);
  };

  // Calcular puntos totales que se obtendrán
  const calculateTotalPoints = (
    progress: number,
    target: number,
    basePoints: number,
    bonusPoints: number,
    thresholds: Challenge['thresholds']
  ) => {
    const percentage = calculateProgressPercentage(progress, target);
    if (percentage >= thresholds.sobrecumplimiento) {
      const maxBasePoints = basePoints + bonusPoints;
      return Math.floor(maxBasePoints * (percentage / 100));
    } else if (percentage >= thresholds.cumplimiento) {
      return basePoints;
    } else if (percentage >= thresholds.subcumplimiento) {
      return Math.floor(basePoints * 0.6);
    } else {
      return 0;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 w-full max-w-full md:h-[calc(100vh-1rem)] md:overflow-y-auto md:m-2 overflow-y-auto overflow-x-hidden pb-[88px] md:pb-0">
      {/* Header */}
      <header 
        className={`bg-white md:bg-white/95 md:backdrop-blur-md transition-all duration-300 md:rounded-2xl md:sticky md:top-0 md:z-30 flex-shrink-0`}
        style={window.innerWidth >= 768 ? { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)' } : {}}
      >
        {/* Desktop Header */}
        <div className="hidden md:block py-[18px] px-6">
          <div className="flex items-center gap-3">
            {/* Filtros de estado agrupados */}
            <div className="flex items-center gap-0 bg-white border border-slate-200 rounded-full p-1">
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filterStatus === 'active' ? 'bg-[#FF8000] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Activos
              </button>
              <button
                onClick={() => setFilterStatus('finished')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filterStatus === 'finished' ? 'bg-[#FF8000] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Finalizados
              </button>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filterStatus === 'all' ? 'bg-[#FF8000] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Todos
              </button>
            </div>

            <div className="flex-1" />
            
            <div className="flex items-center gap-3">
              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Buscar desafío..."
                  className="w-[240px] pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF8000]/20 focus:border-[#FF8000] transition-all text-sm"
                />
              </div>

              {/* Filtro de fecha */}
              <div className="relative" ref={datePickerRef}>
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#FF8000]/30 transition-all text-sm font-medium text-slate-700"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {dateRangeStart && dateRangeEnd
                      ? `${new Date(dateRangeStart).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${new Date(dateRangeEnd).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
                      : 'Filtrar por fecha'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDatePicker && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <DateRangePicker
                      onClose={() => setShowDatePicker(false)}
                      onApply={(start, end) => {
                        setDateRangeStart(start);
                        setDateRangeEnd(end);
                        setShowDatePicker(false);
                      }}
                      onClear={() => {
                        setDateRangeStart(null);
                        setDateRangeEnd(null);
                        setShowDatePicker(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Points Badge */}
              <div className="min-w-[140px] h-[52px] w-fit rounded-xl bg-gradient-to-b from-[#FFAD5B] to-[#FF8000] shadow-md shadow-[#FF8000]/20 px-3 flex items-center gap-3 flex-shrink-0">
                <img src={coinIcon} alt="Coin" className="w-8 h-8 flex-shrink-0" />
                <div className="flex flex-col pr-2">
                  <div className="text-[10px] text-white font-medium opacity-90">Tus puntos</div>
                  <div className="text-[20px] font-bold text-white leading-none">{userPoints.toLocaleString('es-CL')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logoDesafioSawa} alt="Desafío Sawa" className="h-10 object-contain" />
            <div className="flex-1" />
            <div className="px-3 py-2 rounded-full bg-gradient-to-b from-[#FFAD5B] to-[#FF8000] shadow-md shadow-[#FF8000]/20 flex items-center gap-2 flex-shrink-0">
              <img src={coinIcon} alt="Coin" className="w-6 h-6 flex-shrink-0" />
              <div className="flex flex-col">
                <div className="text-[9px] text-white opacity-90 tracking-wide leading-none">Tus puntos</div>
                <div className="text-base font-bold text-white leading-none mt-0.5">{userPoints.toLocaleString('es-CL')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden px-4 py-3 bg-[#F5F8FB]">
          <div className="flex items-center gap-0 bg-white border border-slate-200 rounded-full p-1 mb-3">
            <button
              onClick={() => setFilterStatus('active')}
              className={`flex-1 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'active' ? 'bg-[#FF8000] text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => setFilterStatus('finished')}
              className={`flex-1 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'finished' ? 'bg-[#FF8000] text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Finalizados
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex-1 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'all' ? 'bg-[#FF8000] text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Todos
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-10 pr-3 py-2 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF8000]/20 focus:border-[#FF8000] transition-all text-sm shadow-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-6 w-full">
        <div className="mb-6">
          <p className="text-sm md:text-base text-slate-600">
            Completa desafíos y gana puntos extra para seguir canjeando
          </p>
        </div>

        {/* Grid de desafíos */}
        <AnimatePresence mode="wait">
          {filteredChallenges.length > 0 ? (
            <motion.div
              key="challenges-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/desafios/${challenge.id}`)}
                  className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 relative cursor-pointer ${
                    challenge.isFeatured
                      ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/30 border-0'
                      : 'border border-slate-200 hover:border-[#FF8000]/30 hover:shadow-lg hover:shadow-[#FF8000]/10'
                  }`}
                >
                  {/* Badge de "Desafío principal" */}
                  {challenge.isFeatured && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/40">
                        <Star className="w-3 h-3 text-white fill-white" strokeWidth={2.5} />
                        <span className="text-[10px] font-bold text-white tracking-wide">
                          Desafío principal
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Imagen/Banner */}
                  {(challenge.imageUrl || challenge.iconifyIcon) && challenge.imageType === 'banner' && (
                    <>
                      <ChallengeBanner 
                        imageUrl={challenge.imageUrl}
                        iconifyIcon={challenge.iconifyIcon}
                        title={challenge.title}
                        colorPalette={challenge.colorPalette || 'blue'}
                      >
                        <div className="absolute top-3 right-3">
                          {challenge.status === 'active' ? (
                            (() => {
                              const days = getDaysRemaining(challenge.endDate);
                              const style = getDaysRemainingStyle(days);
                              return (
                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text} backdrop-blur-sm`}>
                                  {style.label}
                                </span>
                              );
                            })()
                          ) : (
                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 backdrop-blur-sm">
                              Finalizado
                            </span>
                          )}
                        </div>
                      </ChallengeBanner>
                      
                      <div className="px-5 pt-4 pb-3">
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {challenge.title}
                        </h3>
                      </div>
                    </>
                  )}

                  {/* Progreso */}
                  <div className="px-5 py-4">
                    {(() => {
                      const progressPercentage = calculateProgressPercentage(challenge.progress, challenge.target);
                      const milestones = [
                        { shortLabel: '60%', completed: progressPercentage >= challenge.thresholds.subcumplimiento },
                        { shortLabel: '100%', completed: progressPercentage >= challenge.thresholds.cumplimiento },
                        { shortLabel: '150%', completed: progressPercentage >= challenge.thresholds.sobrecumplimiento }
                      ];
                      
                      return (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-slate-500">Progreso</span>
                            <span className="text-sm font-bold text-slate-900">
                              {challenge.isMonetary ? (
                                `$${challenge.progress.toLocaleString('es-CL')} / $${challenge.target.toLocaleString('es-CL')}`
                              ) : (
                                `${challenge.progress} / ${challenge.target} ${challenge.unit}`
                              )}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            {milestones.map((m, idx) => (
                              <div key={idx} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                                    idx === 2
                                      ? m.completed ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md' : 'bg-slate-200 text-slate-500'
                                      : m.completed ? 'bg-[#FF8000] text-white' : 'bg-slate-200 text-slate-500'
                                  }`}>
                                    {m.completed ? (idx === 2 ? <Sparkles className="w-3.5 h-3.5" /> : <Check className="w-3 h-3" />) : idx + 1}
                                  </div>
                                  <span className={`text-[11px] mt-1.5 font-semibold ${
                                    idx === 2 ? (m.completed ? 'text-amber-500' : 'text-slate-400') : (m.completed ? 'text-[#FF8000]' : 'text-slate-400')
                                  }`}>
                                    {m.shortLabel}
                                  </span>
                                </div>
                                {idx < milestones.length - 1 && (
                                  <div className="flex-1 px-2 flex items-center" style={{ marginBottom: '24px' }}>
                                    <div className={`w-full h-1 rounded-full transition-all ${
                                      milestones[idx + 1].completed 
                                        ? (idx === 1 ? 'bg-gradient-to-r from-[#FF8000] to-amber-400' : 'bg-[#FF8000]')
                                        : (m.completed ? 'bg-[#FF8000]' : 'bg-slate-200')
                                    }`} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
                    {(() => {
                      const currentPoints = calculateTotalPoints(
                        challenge.progress,
                        challenge.target,
                        challenge.points,
                        challenge.bonusPoints,
                        challenge.thresholds
                      );
                      const maxPoints = challenge.points + challenge.bonusPoints;
                      
                      return (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">Vas ganando</span>
                          <div className="flex items-center gap-1.5">
                            <img src={coinIcon} alt="Coin" className="w-5 h-5 flex-shrink-0" />
                            <span className="text-base">
                              <span className="font-bold text-[#FF8000]">{currentPoints.toLocaleString('es-CL')}</span>
                              <span className="text-slate-500 font-normal"> / {maxPoints.toLocaleString('es-CL')}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No se encontraron desafíos</h3>
              <p className="text-sm text-slate-600">Intenta cambiar los filtros o búsqueda</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}