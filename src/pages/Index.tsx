import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  rating: number;
  comments: number;
  content: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [readingArticle, setReadingArticle] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({
    1: [
      { id: 1, author: 'Мария', text: 'Отличная статья! Очень полезно.', date: '2 дня назад' },
      { id: 2, author: 'Алексей', text: 'Спасибо за информацию!', date: '1 день назад' },
    ],
  });
  const [newComment, setNewComment] = useState('');
  const [ratings, setRatings] = useState<Record<number, number>>({
    1: 4.8,
    2: 4.5,
    3: 4.9,
    4: 4.6,
    5: 4.7,
    6: 4.4,
  });

  const categories = ['Все', 'Технологии', 'Дизайн', 'Маркетинг', 'Бизнес', 'Лайфстайл'];

  const articles: Article[] = [
    {
      id: 1,
      title: 'Современные тренды веб-дизайна 2024',
      excerpt: 'Разбираем главные тренды в веб-дизайне: градиенты, анимации, минимализм и dark mode.',
      category: 'Дизайн',
      author: 'Анна Иванова',
      date: '15 окт 2024',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      rating: 4.8,
      comments: 12,
      content: 'В 2024 году веб-дизайн переживает настоящую революцию. Пользователи ожидают не просто красивые интерфейсы, а целые цифровые переживания.\n\nГрадиенты снова в тренде, но теперь они более утончённые и сложные. Вместо простых двухцветных переходов дизайнеры создают многослойные композиции с несколькими точками градиента.\n\nАнимации стали неотъемлемой частью UX. Микроинтеракции направляют внимание пользователя и делают интерфейс живым. Важно помнить о производительности — каждая анимация должна быть плавной и не замедлять работу сайта.\n\nМинимализм эволюционировал в "максимализм с умом" — смелые типографические решения, яркие цвета, но при этом чистота и воздух в композиции. Это баланс между выразительностью и функциональностью.\n\nDark mode стал стандартом де-факто. Пользователи ценят возможность переключения тем, особенно при длительном чтении. Важно продумать цветовую палитру так, чтобы контент был читабельным в обоих режимах.',
    },
    {
      id: 2,
      title: 'Как React изменил фронтенд-разработку',
      excerpt: 'История развития React и его влияние на современную веб-разработку.',
      category: 'Технологии',
      author: 'Дмитрий Петров',
      date: '12 окт 2024',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      rating: 4.5,
      comments: 8,
      content: 'React появился в 2013 году и полностью изменил подход к созданию пользовательских интерфейсов. Компонентный подход, предложенный Facebook, стал новым стандартом индустрии.\n\nКлючевая идея React — декларативность. Вместо того чтобы описывать шаги по изменению DOM, разработчик описывает желаемое состояние интерфейса. React сам заботится о том, как эффективно обновить страницу.\n\nВиртуальный DOM стал революционным решением проблемы производительности. Вместо прямой работы с медленным браузерным DOM, React сначала обновляет виртуальное представление, вычисляет минимальные изменения и только потом применяет их.\n\nЭкосистема React невероятно богата: Redux для управления состоянием, Next.js для SSR, React Native для мобильных приложений. Это не просто библиотека, а целая платформа для разработки.\n\nСегодня React используют миллионы разработчиков, а навыки работы с ним стали обязательными для фронтенд-специалистов.',
    },
    {
      id: 3,
      title: 'Основы контент-маркетинга для стартапов',
      excerpt: 'Пошаговое руководство по созданию эффективной контент-стратегии.',
      category: 'Маркетинг',
      author: 'Елена Смирнова',
      date: '10 окт 2024',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      rating: 4.9,
      comments: 15,
      content: 'Контент-маркетинг — это не просто написание статей. Это системный подход к привлечению и удержанию аудитории через ценный контент.\n\nШаг 1: Определите свою целевую аудиторию. Создайте детальные портреты ваших идеальных клиентов. Что их волнует? Какие проблемы они решают? Где они ищут информацию?\n\nШаг 2: Выберите форматы контента. Статьи в блоге, видео, подкасты, инфографика — у каждого формата свои преимущества. Начните с 1-2 форматов и масштабируйте постепенно.\n\nШаг 3: Создайте контент-план. Регулярность важнее объёма. Лучше публиковать одну качественную статью в неделю, чем пять посредственных.\n\nШаг 4: Оптимизируйте для SEO. Исследуйте ключевые слова, создавайте качественные заголовки, используйте внутренние ссылки.\n\nШаг 5: Анализируйте результаты. Отслеживайте метрики: просмотры, время на странице, конверсии. Учитесь на данных и корректируйте стратегию.',
    },
    {
      id: 4,
      title: 'Психология цвета в брендинге',
      excerpt: 'Как цвета влияют на восприятие бренда и решения покупателей.',
      category: 'Дизайн',
      author: 'Анна Иванова',
      date: '8 окт 2024',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
      rating: 4.6,
      comments: 10,
      content: 'Цвет — один из мощнейших инструментов в арсенале бренд-дизайнера. Каждый оттенок вызывает определённые эмоции и ассоциации.\n\nКрасный — энергия, страсть, срочность. Не случайно его используют для кнопок "Купить" и распродаж. Coca-Cola, Netflix, YouTube — все они используют силу красного.\n\nСиний — доверие, стабильность, профессионализм. Поэтому его любят банки и IT-компании. Facebook, Twitter, LinkedIn выбрали синий неслучайно.\n\nЗелёный — природа, рост, здоровье. Идеален для эко-брендов и финтеха (ассоциация с деньгами). Starbucks и Spotify успешно используют зелёный.\n\nЖёлтый — оптимизм, молодость, доступность. McDonald\'s сочетает жёлтый с красным для создания ощущения радости и скорости.\n\nВажно помнить о культурных различиях — цвета воспринимаются по-разному в разных странах. Тестируйте свой выбор на целевой аудитории.',
    },
    {
      id: 5,
      title: 'Agile-методологии в малом бизнесе',
      excerpt: 'Применение гибких методологий для повышения эффективности команды.',
      category: 'Бизнес',
      author: 'Сергей Волков',
      date: '5 окт 2024',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      rating: 4.7,
      comments: 6,
      content: 'Agile — это не только для крупных IT-компаний. Малый бизнес может получить огромную пользу от гибких методологий.\n\nОсновной принцип Agile — итеративность. Вместо долгого планирования на год вперёд, вы работаете короткими спринтами в 1-2 недели. Это позволяет быстро адаптироваться к изменениям рынка.\n\nДейли-встречи (15 минут каждое утро) помогают команде синхронизироваться. Каждый делится: что сделал вчера, что планирует сегодня, какие есть препятствия.\n\nРетроспективы после каждого спринта — ключ к улучшению процессов. Команда обсуждает: что сработало хорошо, что можно улучшить, какие эксперименты попробовать.\n\nКанбан-доски (физические или цифровые) визуализируют рабочий процесс. Trello, Notion или даже стикеры на стене — выбирайте удобный инструмент.\n\nГлавное — не пытайтесь внедрить все практики сразу. Начните с малого и адаптируйте под свой контекст.',
    },
    {
      id: 6,
      title: 'Продуктивность удаленной работы',
      excerpt: 'Лучшие практики и инструменты для эффективной работы из дома.',
      category: 'Лайфстайл',
      author: 'Ольга Козлова',
      date: '3 окт 2024',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      rating: 4.4,
      comments: 9,
      content: 'Удалённая работа стала новой нормой, но многие до сих пор борются с продуктивностью дома. Вот проверенные стратегии.\n\nСоздайте рабочее пространство. Даже если у вас нет отдельного кабинета, выделите конкретное место для работы. Мозг должен ассоциировать это место с фокусом и продуктивностью.\n\nУстановите чёткие границы. Определите рабочие часы и придерживайтесь их. Сообщите семье/соседям по квартире, когда вас нельзя отвлекать.\n\nТехника Помодоро творит чудеса: 25 минут фокусной работы, 5 минут перерыва. После 4 помодоро — длинный перерыв 15-30 минут.\n\nИнструменты коммуникации: Slack для текста, Zoom для видео, Notion для документации. Главное — договориться с командой о правилах использования.\n\nНе забывайте о физической активности. Короткие прогулки между задачами, растяжка каждый час, полноценный обеденный перерыв — это инвестиция в продуктивность.\n\nСоциальное взаимодействие важно. Планируйте виртуальные кофе-брейки с коллегами, работайте иногда из коворкинга.',
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === 'Все' || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRating = (articleId: number, change: number) => {
    setRatings((prev) => ({
      ...prev,
      [articleId]: Math.max(0, Math.min(5, (prev[articleId] || 0) + change)),
    }));
  };

  const handleAddComment = (articleId: number) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: 'Вы',
      text: newComment,
      date: 'только что',
    };

    setComments((prev) => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), comment],
    }));
    
    setNewComment('');
  };

  const currentArticle = articles.find((a) => a.id === readingArticle);

  useEffect(() => {
    if (readingArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [readingArticle]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold gradient-text">BlogSpace</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </a>
              <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
                Категории
              </a>
              <a href="#author" className="text-sm font-medium hover:text-primary transition-colors">
                Об авторе
              </a>
            </nav>
            <Button className="gradient-bg text-white">Подписаться</Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Истории, которые вдохновляют
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Познавательные статьи о дизайне, технологиях и творчестве
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full sm:w-96">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-primary"
                />
              </div>
              <Button size="lg" className="gradient-bg text-white h-12 px-8">
                <Icon name="TrendingUp" className="mr-2" size={20} />
                Популярное
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center animate-fade-in">Категории</h3>
          <div className="flex flex-wrap gap-3 justify-center animate-scale-in">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`px-6 py-2 text-base cursor-pointer transition-all hover:scale-105 ${
                  selectedCategory === category
                    ? 'gradient-bg text-white border-0'
                    : 'hover:border-primary'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 gradient-bg text-white border-0">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <h4 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}`} />
                      <AvatarFallback>{article.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{article.author}</p>
                      <p className="text-xs text-muted-foreground">{article.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRating(article.id, 0.1);
                          }}
                          className="h-8 w-8 p-0 hover:text-primary"
                        >
                          <Icon name="ThumbsUp" size={16} />
                        </Button>
                        <span className="text-sm font-medium">{ratings[article.id]?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Icon name="MessageCircle" size={16} />
                        <span className="text-sm">{comments[article.id]?.length || 0}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReadingArticle(article.id);
                      }}
                    >
                      Читать
                      <Icon name="ArrowRight" className="ml-1" size={16} />
                    </Button>
                  </div>
                </CardContent>
                
                {selectedArticle === article.id && (
                  <CardFooter className="flex-col gap-4 bg-muted/30 animate-accordion-down">
                    <Separator />
                    <div className="w-full">
                      <h5 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="MessageSquare" size={18} />
                        Комментарии ({comments[article.id]?.length || 0})
                      </h5>
                      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {comments[article.id]?.map((comment) => (
                          <div key={comment.id} className="bg-background p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Добавить комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="min-h-[80px]"
                        />
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddComment(article.id);
                          }}
                          className="gradient-bg text-white"
                        >
                          <Icon name="Send" size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="author" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden animate-scale-in">
              <div className="gradient-bg h-32"></div>
              <CardContent className="pt-0">
                <div className="flex flex-col md:flex-row gap-6 items-start -mt-16">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MainAuthor" />
                    <AvatarFallback>АИ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 pt-2">
                    <h3 className="text-3xl font-bold mb-2">Анна Иванова</h3>
                    <p className="text-muted-foreground mb-4">
                      Главный редактор • UX/UI дизайнер • Автор 150+ статей
                    </p>
                    <p className="text-base leading-relaxed mb-6">
                      Привет! Я создаю контент о современном дизайне и технологиях уже более 5 лет. 
                      Моя миссия — делиться знаниями и вдохновлять креативных людей на новые проекты. 
                      Верю в силу хорошего дизайна и качественного контента.
                    </p>
                    <div className="flex gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold gradient-text">150+</p>
                        <p className="text-sm text-muted-foreground">Статей</p>
                      </div>
                      <Separator orientation="vertical" className="h-12" />
                      <div className="text-center">
                        <p className="text-3xl font-bold gradient-text">50K+</p>
                        <p className="text-sm text-muted-foreground">Читателей</p>
                      </div>
                      <Separator orientation="vertical" className="h-12" />
                      <div className="text-center">
                        <p className="text-3xl font-bold gradient-text">4.8</p>
                        <p className="text-sm text-muted-foreground">Рейтинг</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Icon name="Mail" className="mr-2" size={16} />
                        Написать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Twitter" className="mr-2" size={16} />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Linkedin" className="mr-2" size={16} />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={readingArticle !== null} onOpenChange={() => setReadingArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
          {currentArticle && (
            <div className="flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <Badge className="gradient-bg text-white border-0 mb-3">
                      {currentArticle.category}
                    </Badge>
                    <h2 className="text-4xl font-bold text-white mb-2">{currentArticle.title}</h2>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentArticle.author}`} />
                        <AvatarFallback>{currentArticle.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-white">
                        <p className="text-sm font-medium">{currentArticle.author}</p>
                        <p className="text-xs opacity-90">{currentArticle.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  onClick={() => setReadingArticle(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <ScrollArea className="flex-1 px-8 py-6">
                <article className="prose prose-lg max-w-none">
                  <p className="text-xl text-muted-foreground mb-6 italic">
                    {currentArticle.excerpt}
                  </p>
                  <div className="text-base leading-relaxed whitespace-pre-line">
                    {currentArticle.content}
                  </div>
                </article>

                <Separator className="my-8" />

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRating(currentArticle.id, 0.1)}
                          className="hover:bg-primary hover:text-white"
                        >
                          <Icon name="ThumbsUp" className="mr-2" size={16} />
                          {ratings[currentArticle.id]?.toFixed(1)}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="MessageCircle" size={18} />
                        <span>{comments[currentArticle.id]?.length || 0} комментариев</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Eye" size={18} />
                        <span>2.4K просмотров</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Share2" size={16} className="mr-2" />
                        Поделиться
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Bookmark" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Комментарии ({comments[currentArticle.id]?.length || 0})</h3>
                  <div className="space-y-4 mb-6">
                    {comments[currentArticle.id]?.map((comment) => (
                      <div key={comment.id} className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground ml-2">{comment.date}</span>
                          </div>
                        </div>
                        <p className="text-sm ml-11">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Добавить комментарий..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button
                      onClick={() => {
                        handleAddComment(currentArticle.id);
                      }}
                      className="gradient-bg text-white h-auto"
                    >
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-2">BlogSpace</h3>
              <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="Rss" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Instagram" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;