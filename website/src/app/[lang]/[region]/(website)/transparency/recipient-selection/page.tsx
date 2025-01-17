import { DefaultPageProps } from '@/app/[lang]/[region]';
import { DrawCard } from '@/app/[lang]/[region]/(website)/transparency/recipient-selection/draw-card';
import { loadPastDraws } from '@/app/[lang]/[region]/(website)/transparency/recipient-selection/state';
import { Translator } from '@socialincome/shared/src/utils/i18n';
import { BaseContainer, Card, Typography } from '@socialincome/ui';

export default async function Page({ params: { lang } }: DefaultPageProps) {
	const pastDraws = await loadPastDraws();
	const translator = await Translator.getInstance({
		language: lang,
		namespaces: 'website-recipient-selection',
	});

	return (
		<BaseContainer className="mx-auto max-w-3xl space-y-16 pb-16">
			<div className="space-y-8">
				<div>
					<Typography as="h1" weight="bold" size="4xl">
						{translator.t('title')}
					</Typography>
					<Typography className="mt-4" dangerouslySetInnerHTML={{ __html: translator.t('introduction') }} />
				</div>
				<div className="space-y-4">
					<div>
						<Typography as="h2" size="xl" weight="bold">
							{translator.t('selection-process.step-1.title')}
						</Typography>
						<Typography as="h2" className="mt-2">
							{translator.t('selection-process.step-1.text')}
						</Typography>
					</div>
					<div>
						<Typography as="h2" size="xl" weight="bold">
							{translator.t('selection-process.step-2.title')}
						</Typography>
						<Typography as="h2" className="mt-2">
							{translator.t('selection-process.step-2.text')}
						</Typography>
					</div>
					<Card className="mx-auto max-w-xl p-4">
						<Typography>{translator.t('selection-process.step-2.card')}</Typography>
					</Card>
					<div>
						<Typography as="h2" size="xl" weight="bold">
							{translator.t('selection-process.step-3.title')}
						</Typography>
						<Typography as="h2" className="mt-2">
							{translator.t('selection-process.step-3.text')}
						</Typography>
					</div>
				</div>
			</div>

			<div className="space-y-8">
				<Typography as="h2" size="2xl" weight="bold">
					{translator.t('faq.title')}
				</Typography>
				<div className="space-y-4">
					{translator.t<{ question: string; answer: string }[]>('faq.questions').map(({ question, answer }, index) => (
						<div key={index}>
							<Typography as="h3" size="xl" weight="bold">
								{question}
							</Typography>
							<Typography as="p" className="mt-2" dangerouslySetInnerHTML={{ __html: answer }} />
						</div>
					))}
				</div>
			</div>

			<div className="space-y-8">
				<Typography as="h2" size="2xl" weight="bold">
					{translator.t('past-draws')}
				</Typography>
				<Typography>{translator.t('past-draws-description')}</Typography>
				<div className="mx-auto max-w-3xl space-y-4">
					{pastDraws.map((draw, index) => (
						<DrawCard
							key={index}
							lang={lang}
							draw={draw}
							translations={{
								summary: translator.t('draw-card.summary', { context: { total: draw.total, count: draw.count } }),
								randomNumber: translator.t('draw-card.random-number'),
								confirmGithub: translator.t('draw-card.confirm-github'),
								confirmDrand: translator.t('draw-card.confirm-drand'),
								people: translator.t('draw-card.people'),
								longlist: translator.t('draw-card.long-list', { context: { total: draw.total, count: draw.count } }),
							}}
						/>
					))}
				</div>
			</div>
		</BaseContainer>
	);
}
