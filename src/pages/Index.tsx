import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
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
                    <Button size="sm" variant="ghost" className="text-primary">
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
