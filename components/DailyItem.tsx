import { ItemType } from '@/recoil/data';
import AddButton from './AddButton';
import AddModal from './AddModal';
import { useState } from 'react';
import LogItem from './LogItem';
import items from '@/constants/items';

type DailyItemPropsType = {
  date: string;
  isToday?: boolean;
  morning?: ItemType[];
  morningSnack?: ItemType[];
  lunch?: ItemType[];
  afternoonSnack?: ItemType[];
  midMeal?: ItemType[];
  dinner?: ItemType[];
  midnightSnack?: ItemType[];
};

const DailyItem = ({
  date,
  isToday = false,
  morning = [],
  morningSnack = [],
  lunch = [],
  afternoonSnack = [],
  midMeal = [],
  dinner = [],
  midnightSnack = [],
}: DailyItemPropsType) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="flex gap-2 items-baseline mb-4">
        <h2 className="text-2xl font-semibold">{date}</h2>
        {isToday && (
          <span className="rounded bg-rose-400 text-xs text-white px-1 py-0.5">
            오늘
          </span>
        )}
      </div>
      <div className="my-5">총 탄수화물: / 단백질: / 지방: </div>
      {morning.length > 0 && (
        <div>
          <h3 className="text-xl font-medium mb-2">아침</h3>
          <div className="grid grid-cols-3 gap-8">
            {morning.map((item, idx) => (
              <LogItem
                key={`${date}-morning-${idx}`}
                name={items[item.index].name}
                brand={items[item.index].brand}
                image={items[item.index].image}
                carbohydrate={item.nutrition.carbohydrate}
                protin={item.nutrition.protein}
                fat={item.nutrition.fat}
              />
            ))}
          </div>
        </div>
      )}
      <AddButton onClick={() => setOpenModal(true)} />
      {openModal && (
        <AddModal date={date} closeHandler={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default DailyItem;
